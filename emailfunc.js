function notificationmail(message,subject,toemail,femail){
  // Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-1'});

// Create sendEmail params
var params = {
  Destination: { /* required */
    ToAddresses: [
      `${toemail}`
    ]
  },
  Message: { /* required */
    Body: { /* required */
    /*  Html: {
       Charset: "UTF-8",
       Data: "HTML_FORMAT_BODY"
     }, */
      Text: {
       Charset: "UTF-8",
       Data: `${message}`
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: `${subject}`
     }
    },
  Source: 'notifications@vibecartons.com', /* required */
  ReplyToAddresses: [
    `${femail}`
  ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
}
