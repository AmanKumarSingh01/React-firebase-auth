import React, {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import firebase from 'firebase';
function Signup(props) {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [VerifyPass, setVerifyPass] = useState('');
    const [IsValid, setIsValid] = useState(true);
    const [IsMatch, setIsMatch] = useState(true);
    const Signup = (e) => {
        e.preventDefault();
        if (Password === VerifyPass) {
            firebase.auth().createUserWithEmailAndPassword(Email, Password).then(function (user) {
                alert('User created, please login')
                props.history.push({
                    pathname: '/',
                    state: {
                        Email,
                        Password
                    }
                })
            }).catch(function (error) {
                var errorMessage = error.message;
                console.log(errorMessage)
            });
        }else {
            setIsMatch(false);
            console.log(IsMatch)
        }
    }
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
                    width: '20rem',
                    position: 'fixed',
                    top: 'auto',
                    left: '50%',
                    transform: 'translate(-50% , 50%)'
                }
            } >
                <Card.Body>
                        <form onSubmit ={Signup} >
                            <label>
                                Email
                            </label>
                            <br/>
                            <input
                                type="email"
                                placeholder = "someOne@something.com"
                                autoComplete = "off"
                                value = {Email}
                                onChange ={e => setEmail(e.target.value)}
                            />
                            <br/>
                            <label>
                                Password
                            </label>
                            <br/>
                            <input
                                type="password"
                                placeholder = "Password"
                                autoComplete = "off"
                                value = {Password}
                                onChange = {e => {
                                    setPassword(e.target.value);
                                    if (!e.target.value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                                        setIsValid(false)
                                    } else {
                                        setIsValid(true)
                                    }
                                }}
                            />
                            { 
                                IsValid ===false ? 
                                    <p 
                                    style ={{
                                            fontSize : '0.7rem',
                                            color : 'red'
                                        }}
                                    >Password must contain  1 Upper case, one special character, one number and atleast 8 character </p>
                                    : <p></p> 
                            }
                            <br/>
                            <label>
                                Re-Enter Password
                            </label>
                            <br/>
                            <input
                                type="password"
                                placeholder = "Password"
                                autoComplete = "off"
                                value = {VerifyPass}
                                onChange = {e => {
                                    setVerifyPass(e.target.value);
                                    if (Password === e.target.value) {
                                        setIsMatch(true);
                                    } else {
                                        setIsMatch(false)
                                    }
                                }}
                            />
                            <br />
                            { 
                                IsMatch ===false ? 
                                    <p
                                    style ={{
                                        fontSize : '0.7rem',
                                        color : 'red'
                                    }}
                                    >Password dosen't match</p> 
                                : <p></p>
                            }
                            <br/>
                            <input
                                type="submit"
                                text ="Login"
                            />
                    </form>
                </Card.Body>
                <Card.Footer>
                    <span>Already have an account? <Link to="/">signin</Link> </span>
                </Card.Footer>
            </Card>
        </div>
    )
}
export default withRouter(Signup);