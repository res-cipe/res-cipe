import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import AddApplication from './components/AddApplication';
import AddResume from './components/AddResume';
import Login from './components/Login';

const App = () => {
  // hook to control opening/closing modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <AddApplication />
          <Button onClick={onOpen}>Add Resume</Button>
          <AddResume isOpen={isOpen} onClose={onClose} />
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default App;
