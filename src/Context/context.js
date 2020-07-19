import React, { Component, createContext } from "react";
import firebase from 'firebase';


export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: "Aman"
  };

//   componentDidMount = () => {
//     firebase.auth.onAuthStateChanged(userAuth => {
//       this.setState({ user: userAuth});
//     });
//   };
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;