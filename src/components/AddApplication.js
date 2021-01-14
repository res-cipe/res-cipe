import React from 'react';
import { Formik, Form, Field } from 'formik';
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

export default function AddApplication({ userId, resumes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function submitApp(e) {
    console.log(e.target);
  }
  return (
    <>
      <Button onClick={onOpen}>Add Application</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Application</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              companyName: '',
              jobLink: '',
              techstack: '',
              resume: '',
            }}
            onSubmit={(values, actions) => {
              const { companyName, jobLink, techstack, resume } = values;
              fetch(`/dashboard/${userId}/resume`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  companyName,
                  jobPostLink: jobLink,
                  techStack: techstack,
                  resumeId: resume,
                }),
              });
            }}
          >
            <FormControl isRequired>
              <Input placeholder='Company Name' id='companyName' />
              <Input placeholder='Job Post Link' id='jobLink' />
              <Select placeholder='Choose a resumé...' id='resume'>
                {/* {resumes.map((resume) => (
                  <option id={resume.id}>{resume.res_name}</option>
                ))} */}
              </Select>
              <Textarea placeholder='Tech Stack' id='techstack' />
              <Button
                colorScheme='blue'
                type='submit'
                onClick={(e) => submitApp(e)}
              >
                Submit
              </Button>
            </FormControl>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
