import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LoginContainer from './components/test/LoginContainer';

export default function App() {
  const [state, setState] = useState({ userId: 19, isLoggedIn: true }); // defaults should be changed back to null, and false respectively

  return (
    <div>
      {state.isLoggedIn ? (
        <Dashboard userId={state.userId} />
      ) : (
        <LoginContainer setState={setState} />
      )}
    </div>
  );
}
