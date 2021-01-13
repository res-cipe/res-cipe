import React from 'react';
import {
  Button,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';

export default function AddApplication() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Add Application</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Application</ModalHeader>
          <ModalCloseButton />
          <FormControl isRequired>
            <Input placeholder='Company Name' id='company-name' />
            <Input placeholder='Job Post Link' id='job-link' />
            <Select placeholder='Choose a resumé...'>
              <option value='option 1'>Option 1</option>
              <option value='option 2'>Option 2</option>
            </Select>
            <Textarea placeholder='Tech Stack' />
          </FormControl>

          <ModalFooter>
            <Button colorScheme='blue'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
