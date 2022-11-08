import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function Formfirebase() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const getUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // Here we are getting the data from the form
    //  Here e.target.name will give us the name of the input field
    //  e.target.value will give us the value of the input field
    // setUser will set the value of the input field to the user object
    // user object will be like {name: "value of name input field", email: "value of email input field", password: "value of password input field"}
    // Here we are using the spread operator to copy the previous values of the user object and then we are setting the new value of the input field
    // For example if the user object is {name: "value of name input field", email: "value of email input field", password: "value of password input field"}
    // and if the user is typing in the name input field then the user object will be like {name: "new value of name input field", email: "value of email input field", password: "value of password input field"}
    // and if the user is typing in the email input field then the user object will be like {name: "value of name input field", email: "new value of email input field", password: "value of password input field"}
  };
  const postTheData = async (event) => {
    event.preventDefault();
    const { name, email, password } = user;
    if (name && email && password) {
      const response = await fetch(
        "https://simple-firebase-firestore-default-rtdb.firebaseio.com/simplefirebasedatabase.json",
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        }
      );
      if (response.ok) {
        alert("Data posted successfully");
        setUser({ name: "", email: "", password: "" });
      }
    } else {
      alert("Please fill all the fields");
    }
    // Here we are preventing the default behaviour of the form
    // By default the form will refresh the page when we click on the submit button
    // We don't want that to happen
    // So we are preventing the default behaviour of the form
    // console.log(user);

    // Here we are logging the user object to the console
    // You can do whatever you want with the user object
    // For example you can send the user object to the firebase database
  };

  return (
    <div className=" d-flex align-items-center justify-content-center m-4">
      <Form
        className="w-50 fs-4"
        method="POST"
        style={{
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.4)",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={user.name}
            onChange={getUserData}
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={user.email}
            onChange={getUserData}
            autoComplete="off"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={getUserData}
            autoComplete="off"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={postTheData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Formfirebase;
