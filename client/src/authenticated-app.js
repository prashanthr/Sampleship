import React from 'react';
import { Formik} from 'formik';
import * as Yup from 'yup';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { Form, Input, InputNumber, Checkbox } from 'formik-antd'

export default function AuthenticatedApp() {
  return (
    <div>
      <div>
          <Router>
            <div>
                <nav>
                  <ul>
                      <li>
                        <Link to="/">
                        Home</Link>
                      </li>
                      <li>
                        <Link to="/samplereq">
                        New Sample Request</Link>
                      </li>
                      <li>
                        <Link to="/ship">
                        Outstanding Request</Link>
                      </li>
                  </ul>
                </nav>
                <Switch>
                  <Route path="/ship">
                      <Ship />
                  </Route>
                  <Route path="/samplereq">
                      <SampleReq />
                  </Route>
                  <Route path="/">
                      <AuthenticatedApp />
                  </Route>
                </Switch>
            </div>
          </Router>
      </div>
      <div className="container centered justify-content-center">
          <div className="col-xs-1 col-md-8">
            <div className="row text-center justify-content-center">
                <h1> Internal Sample Request System </h1>
            </div>
          </div>
      </div>
    </div>
  )
}

function Ship(){
  return(
    "todo"
  )
}

function SampleReq(){
  return(
    <div className="container centered justify-content-center">
    <div className="col-xs-1 col-md-8">
       <div className="row text-center justify-content-center">
        <h1> Internal Sample Request System </h1>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '' , semail:''}}
          validationSchema={Yup.object({
            fname: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
            lname: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
            cemail: Yup.string().email('Invalid email address').required('Required'),
            semail: Yup.string().email('Invalid email address').required('Required'),
          })}
      onSubmit={(values, { setSubmitting }) => {
        fetch("/api/samplereqpost",{
          method:"POST",
          body: JSON.stringify(values)
        }).then(res => {
          alert(res);
        });
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
      <Form.Item name='fname'>
        <label htmlFor="fname">First Name</label>
        <Input name="fname" type="text" />
      </Form.Item>
      <Form.Item name='lname'>
        <label htmlFor="lname">Last Name</label>
        <Input name="lname" type="text" />
      </Form.Item>
      <Form.Item name='cemail'>
        <label htmlFor="cemail">Customer Email Address</label>
        <Input name="cemail" type="email" />
      </Form.Item>
      <Form.Item name='semail'>
        <label htmlFor="semail">Sales Rep Email Address</label>
        <Input name="semail" type="email" />
      </Form.Item>
        <Input
          addonBefore="Address Line 1"
          name="address.line1"
        />
        <Input
          addonBefore="Address Line 2"
          name="address.line2"
        />
        <Input
          addonBefore="Address Line 3"
          name="address.line3"
        />
        <Input
          addonBefore="city"
          name="address.city"
        />
        <Input
          addonBefore="State"
          name="address.state"
        />
        <Input
          addonBefore="Zip Code"
          name="address.zip"
        />
        <Input.TextArea name="samples" placeholder="Requested Samples" />

        // We'll use this later, for now, text area will be fine

        <button type="submit">Submit</button>
      </Form>
    </Formik>
        </div>
        </div>
        </div>
    )}
