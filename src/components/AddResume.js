import React from 'react';
import Dropzone from 'react-dropzone';
import {
  Button,
  ModalContent,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Select,
  Textarea,
} from '@chakra-ui/react';

export default function AddResume() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Add Resume</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Resume</ModalHeader>
          <ModalCloseButton />
          <FormControl id='resume-nickname' isRequired>
            <Input placeholder='Resume Nickname' />
          </FormControl>

          <ModalFooter>
            <Button colorScheme='blue'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
