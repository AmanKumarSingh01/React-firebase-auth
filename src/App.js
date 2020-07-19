import React, { useEffect, useState, Component } from 'react';
import { HashRouter, Switch, Route , Redirect } from 'react-router-dom';
import firebase from 'firebase';
import ContextProvider from './Context/context';
import config from './cofig/firebaseConfig'
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import Home from './pages/Home/Home';
import { Spinner } from 'react-bootstrap';


firebase.initializeApp(config);


const ProtectedRoute = ({ uid,component: Component, ...rest }) => {
  console.log(uid)
  if (uid) {
    return (
        <Route {...rest} render={
          props => <Component {...rest} {...props} />
        } />
      )
  }else {
      return (<Redirect to = '/' />)
  }
}


const CRoute = ({ uid,component: Component, ...rest }) => {
  console.log(Component)
  if (uid) {
    return (<Redirect to = '/home' />)
  }else {
       return (
        <Route {...rest} render={
          props => <Component {...rest} {...props} />
        } />
      )
  }
}


class App extends Component {
  // const [User, setUSer] = useState(null)
  // useEffect(() => {
  //   (async () => {
  //     await firebase.auth().onAuthStateChanged(user => setUSer(user.uid))
  //   })();
  // }, [])
  state = {
    User: null,
    Loaded : 'false'
  }
  componentDidMount = async() => {
    await firebase.auth().onAuthStateChanged(user => this.setState({User : user , Loaded : true}))
  }
  render() {
    if (this.state.Loaded === true) {
      return (
        <HashRouter>
          <Switch>
            <Route uid ={this.state.User} exact path='/' component={() => <Login uid = {this.state.User}/>} />
            <Route uid={this.state.User} exact path='/signup' component={() => <Signup uid={this.state.User}/>} />
            <ProtectedRoute uid ={this.state.User} exact path = "/home" component = {Home}/>
          </Switch>
        </HashRouter>
      );
    } else {
      return (
        <Spinner/>
      )
    }
  
  }
}

export default App;

// const firebaseAppAuth = firebaseApp.auth();

// export default withFirebaseAuth({
//   // providers,
//   firebaseAppAuth,
// })(App);