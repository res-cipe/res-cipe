import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import AddApplication from './components/AddApplication';
import AddResume from './components/AddResume';
// import Signup from './components/Signup';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  // hook to control opening/closing modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <AddApplication />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}

      <Button onClick={onOpen}>Add Resume</Button>
      <AddResume isOpen={isOpen} onClose={onClose} />
      <Signup />
    </div>
  );
};

export default App;
