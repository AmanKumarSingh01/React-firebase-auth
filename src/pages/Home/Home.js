import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
class Home extends Component {
    componentDidMount() {
        // firebase.auth().currentUser.getIdToken()
        //     .then(idToken => {
        //         localStorage.setItem('token' , idToken)
        //     })
        //     .catch(e => console.log(e))
    }
    signout = () => {
        firebase.auth().signOut()
            .then(r => {
                console.log('signout');
                localStorage.setItem("isAuth", false)
                this.props.history.push('/')
            })
    }
    render() {
        return (
            <div>
                Home
                 <Button onClick = {this.signout}>Signout</Button>
            </div>
        )
    }
}
export default withRouter(Home)