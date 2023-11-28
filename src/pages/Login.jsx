import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase";
import CenteredContainer from "./CenterContainer";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to profile page
      navigate("/profile");

    }
  }, [firebase, navigate]);

  const Signup = ()=>{
    navigate("/hello");
  }

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    console.log("login in a user...");
    const result = await firebase.singinUserWithEmailAndPass(email, password).catch((err)=>{
      alert(err);
    })
    .then(()=>{
      if(email || password) alert("Successfully Login...")
    })
    .catch((err)=>{
          alert(err);
    })
    ;
    console.log("Successfull", result);
  };

  return (
    <CenteredContainer>
    <div className=" align-items-center" >
    <div className="container mt-5 " >
      <Form 
       onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Log In</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className=" container text-center " >
          <div>
        <Button variant="primary" type="submit">
          Login
        </Button>
        </div>
      <Button className="mt-2" 
      onClick={firebase.signinWithGoogle} variant="danger">
        Signin with Google
      </Button>
        </div>
        <br /> <hr />
        <span onClick={(Signup)}
        className="mt-3 mb-3 "
    style={{fontSize: 20, fontWeight: 'bold', }} >Create New Account </span>
      </Form>
   
      </div>
    </div>

    </CenteredContainer>

  );
};

export default LoginPage;
