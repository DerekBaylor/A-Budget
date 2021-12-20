import React from 'react';
import { signInUser } from '../api/auth';

export default function SignInView() {
  return (
    <div className="text-center mt-5 sign-in-container">
      <h1>Welcome to A Budget!</h1>
      <p>A budget is a great a tool to help people reach financial freedom.</p>
      <h5> Please sign in to get started.</h5>
      <button
        type="button"
        className="btn btn-secondary signIn-button"
        onClick={signInUser}
      >
        Sign In
      </button>
    </div>
  );
}
