const express = require('express'),
  app = express()
  bodyParser = require('body-parser');
const fs = require('fs');
const emailfunc = require("./emailfunc")
const db = require('better-sqlite3')('./db/samples.db');
const path=require('path');
var session = require('express-session')
require('dotenv').config();

var checkdb = db.exec('SELECT count(*) FROM sqlite_master');
if (checkdb == 0) {
  db.exec('/db/init.sql');
}

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(express.static(path.resolve(__dirname, './client/build')));
//Serve Index page
var urlencodedParser = bodyParser.urlencoded({extended: false})
// Handle Post request
app.post('/api/samplereqpost', urlencodedParser, function (req,res) {
  var fname = 'firstName:'+ req.body.fname;
  var lname = 'lastName:'+ req.body.lname;
  var address = 'Address:'+ req.body.address;
  var samples = 'Samples:'+ req.body.samples;
  var date = 'Date:'+ req.body.date;
  var cemail = 'CustomerEmail:' + req.body.cemail;
  var semail = 'SalesRepEmail:' + req.body.semail;
  var sampledb = db.prepare("INSERT INTO samples (fname, lname, address, samples, date, cemail, semail) VALUES (?,?,?,?,?,?,?)");
  let requestbody = {fname,lname,address,samples,date,cemail,semail};
  stmt.run(requestbody);
  let requestJSON = JSON.stringify(requestbody, null, 2);
  var historicJSON = fs.readFileSync('/data/samplehistory.JSON');
  let historicJSONcontent = JSON.parse(historicJSON);
  historicJSONcontent.push(requestJSON);
  fs.writeFile("/data/samplehistory.json", JSON.stringify(historicJSONcontent));
  //not implemented yet
  /* notificationmail(requestJSON,semail); */
  res.send("Request Received. An email will be sent to you with updated tracking info when package is mailed.")
})

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
app.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    /* This is from original implementation using ORM
    const { name, email, picture } = ticket.getPayload();
    const user = await db.user.upsert({
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    }) */

    // New implementation directly using SQL
    const { name, email, picture, hd } = ticket.getPayload();
    if (hd === 'vibecartons.com') {
      var userupdate = db.prepare('INSERT INTO users(email,name,picture) VALUES (@email,@name,@picture) ON CONFLICT(email) DO UPDATE SET name=excluded.name, picture=excluded.picture').run(name,email,picture);
      var user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      req.session.userID = user.id;
      res.status(201);
      res.json(user);
    } else {
      res.status(403)
    }
})

app.use(async (req, res, next) => {
    var finduser = db.prepare('SELECT * FROM users WHERE id = ?');
    if (req.session.authorized) {
      const user = await finduser.get(req.session.userId);
      req.user = user;
      next()
    }
})


app.get("/api/v1/auth/me", async (req, res) => {
    res.status(200);
    res.json(req.user);
})

app.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy();
    res.status(200);
    res.json({
        message: "Logged out successfully"
    });
})


function notificationmail(request,semail){
  const {EOL} = require('os');
  //ParseJSON
  var info = JSON.parse(requestJSON);
  var messagereq = `A new sample request has been submitted.${EOL}Submission Data:${EOL}${info}${EOL} For more info go to https://samples.vibecartons.com.`;
  var toemail = 'samples@vibecartons.com';
  var subject = 'A new sample request has been submitted';
  emailfunc(messagereq,subject,toemail,semail);
}

app.listen(3000,function(){
  console.log("Server responding on Port 3000");
})
