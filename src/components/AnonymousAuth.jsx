import React from 'react';
import { signInAnonymouslyUser, signOutUser, observeAuth } from '../firebase.js';

class AnonymousAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.unsubscribe = observeAuth((user) => {
      this.setState({ user: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  signIn = async () => {
    try {
      await signInAnonymouslyUser();
    } catch (error) {
      console.error('Anonymous sign-in failed', error);
    }
  };

  signOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <div>
        { user ? (
            <button onClick={this.signOut}>Log Out</button>
          ) : (
            <button onClick={this.signIn}>Anonymous Log In</button>
        )}
      </div>
    );
  }
}

export default AnonymousAuth;
