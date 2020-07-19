import React, {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import firebase from 'firebase';
import ForgetPasswordModal from '../../Components/ForgetPasswordModal';
function Login(props) {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const login = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(Email, Password)
            .then(res => {
                localStorage.setItem( "isAuth" , "true" )
                props.history.push({
                    pathname: '/home',
                    state: { ...props , ...res }
                });
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {        
        if (props.location.state !== undefined) {
            setEmail(props.location.state.Email);
            setPassword(props.location.state.Password);
        }
    }, [props.location.state])
    useEffect(() => {
        console.log("inside useEffect", props.uid);
         if (props.uid) {
             props.history.push({
                 pathname: '/home',
             });
         }
     }, [props.uid])
    return (
        <div>
            < Card style = {
                {
                    position: 'fixed',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50% , 50%)'
                }
            } >
                <Card.Body>
                        <form onSubmit= {login} >
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
                            <br/>
                            <label>
                                Password
                            </label>
                            <br/>
                            <input
                                type="password"
                                placeholder = "Password"
                                value = {Password}
                                onChange ={ e => setPassword(e.target.value)}
                                autoComplete = "off"
                            />
                            <br/>
                            <input
                                type="submit"
                                text ="Login"
                            />
                    </form>
                    <br/>
                    <ForgetPasswordModal/>
                </Card.Body>
                <Card.Footer>
                    <span>Dont have an account? <Link to ="/signup">signup</Link> </span>
                </Card.Footer>
            </Card>
        </div>
    )
}
export default withRouter(Login);