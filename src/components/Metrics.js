import React from 'react';
import {
  Code,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
} from '@chakra-ui/react';

export default function Metrics({ applications }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const resumeData = {};

  function percentEval(success, total) {
    return Math.round((success / total) * 10000) / 100;
  }

  applications.forEach((el) => {
    const { res_name, status } = el;
    console.log(el);
    if (!resumeData[res_name]) {
      resumeData[res_name] = { success: 0, failure: 0, total: 0 };
    }
    if (status === 'Applied' || status === 'Rejected') {
      resumeData[res_name].failure++;
    } else {
      resumeData[res_name].success++;
    }
    resumeData[res_name].total++;
  });

  console.log(resumeData);
  console.log(percentEval(0, 3));

  const resMetrics = [];
  const workingResumes = Object.keys(resumeData);
  workingResumes.forEach((resume) => {
    const { success, total } = resumeData[resume];
    console.log(success, total);
    const percent = percentEval(success, total);
    resMetrics.push(
      <Code key={resume}>
        {resume} --- Success Rate: {percent} %
      </Code>
    );
  });

  return (
    <>
      <Button onClick={onOpen}>Metrics</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Metrics</ModalHeader>
          <ModalCloseButton />
          {resMetrics}
        </ModalContent>
      </Modal>
    </>
  );
}
