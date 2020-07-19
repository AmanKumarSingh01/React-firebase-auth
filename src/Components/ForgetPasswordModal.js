import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import firebase from 'firebase'

export default function ForgetPasswordModal() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 
  const [Email, setEmail] = useState('');
  const [Message, setMessage] = useState('');
  const resetPass = () =>{
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(Email)
          .then(res => {
              alert("Password reset link sent, please check your email ID")
              setShow(false);
          })
      .catch(err => setMessage(err.message))
  }
  return (
    <>
      <p onClick={handleShow}>
        Forget Password?
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <label>
                Email
          </label>
          <br/>
          <input
              type="email"
              placeholder = "someOne@something.com"
              value = {Email}
              onChange ={ e => setEmail(e.target.value)}
              autoComplete = "off"
          />
          <p>{Message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={resetPass} variant="primary">Get reset link</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
