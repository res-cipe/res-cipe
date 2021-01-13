import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}
