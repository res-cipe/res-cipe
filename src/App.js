import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import AddApplication from './components/AddApplication';
import AddResume from './components/AddResume';

const App = () => {
  // hook to control opening/closing modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <AddApplication />
      <Button onClick={onOpen}>Add Resume</Button>
      <AddResume isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default App;
