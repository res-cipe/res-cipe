import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
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

const Preview = ({ meta }) => {
  const { name, percent, status } = meta;
  return (
    <span
      style={{
        alignSelf: 'flex-start',
        margin: '10px 3%',
        fontFamily: 'Helvetica',
      }}
    >
      {name}, {Math.round(percent)}%, {status}
    </span>
  );
};

export default function AddResume() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUploadParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' };
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <>
      <Button onClick={onOpen}>Add Resume</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Resume</ModalHeader>
          <ModalCloseButton />
          <FormControl id="resume-nickname" isRequired>
            <Input placeholder="Resume Nickname" />
          </FormControl>
          <Dropzone
            getUploadParams={getUploadParams}
            onSubmit={handleSubmit}
            PreviewComponent={Preview}
            inputContent="Drop Files"
            disabled={(files) =>
              files.some((f) =>
                ['preparing', 'getting_upload_params', 'uploading'].includes(
                  f.meta.status
                )
              )
            }
            SubmitButtonComponent={() => (
              <Button colorScheme="blue">Submit</Button>
            )}
          />
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
