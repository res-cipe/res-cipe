import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(1);

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard userId={userId} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
      )}
    </div>
  );
}
