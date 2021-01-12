import React from 'react';
import AddApplication from './components/AddApplication';
import AddResume from './components/AddResume';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <div>
      <Login />
      <AddApplication />
      <AddResume />

      <Signup />
    </div>
  );
};

export default App;
