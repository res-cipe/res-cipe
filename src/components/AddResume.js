import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
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
} from '@chakra-ui/react';

// preview component for Dropzone
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
  // hook to control opening/closing modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // state for resume cloudinary url
  const [resumeURL, setResumeURL] = useState('');
  // state for resume label
  const [resumeLabel, setResumeLabel] = useState('');

  const handleClickAndCloseModal = () => {
    // make network request to backend to send resume label and url

    // close modal1
    onClose();
  };

  // upload parameters
  const getUploadParams = ({ file, meta }) => {
    const body = new FormData();
    body.append('file', file);
    body.append('upload_preset', 'resume');
    return {
      url: 'https://api.cloudinary.com/v1_1/res-cipe/auto/upload',
      body,
    };
  };

  // handles submit for only the file upload, triggered if upload is successful
  const handleUpload = (files, allFiles) => {
    let { url } = JSON.parse(files[0].xhr.response);
    // because of cloudinary security restrictions, we cannot serve pdf files directly
    // instead change the extension of the file being requested and cloudinary will
    // automatically transform the pdf file to an image on the fly
    setResumeURL(url.replace(/\.pdf/, '.png'));

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
            <Input
              onChange={(e) => setResumeLabel(e.target.value)}
              placeholder="Resume Nickname"
            />
          </FormControl>
          <Dropzone
            getUploadParams={getUploadParams}
            onSubmit={handleUpload}
            PreviewComponent={Preview}
            inputContent="Drop Files"
            disabled={(files) =>
              files.some((f) =>
                ['preparing', 'getting_upload_params', 'uploading'].includes(
                  f.meta.status
                )
              )
            }
          />
          <ModalFooter>
            <Button onClick={handleClickAndCloseModal} colorScheme="blue">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
