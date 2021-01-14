import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import AddApplication from './AddApplication';
import AddResume from './AddResume';
import ApplicationCard from './ApplicationCard';

export default function Dashboard({ userId }) {
  const props = [
    {
      imageUrl: 'https://bit.ly/2Z4KKcF',
      imageAlt: 'Rear view of modern home with pool',
      company_name: 'Fucking Google',
      job_post_link:
        'https://www.linkedin.com/jobs/view/2208417001/?alternateChannel=search&refId=QayKwfbK20TiNXWx9cc8EA%3D%3D&trackingId=Ox84l426JPW8q3kqUloalg%3D%3D',
      reviewCount: 34,
      rating: 3,
      res_name: 'Purple Header',
      status: 'Interested',
      id: 1001,
    },
    {
      company_name: 'Facebook',
      job_post_link: 'facebook.com',
      rating: 5,
      res_name: 'More Pedestrian',
      status: 'Offer',
      id: 1002,
    },
    {
      company_name: 'linkedIn',
      job_post_link: 'linkedin.com',
      rating: 1,
      res_name: 'More Pedestrian',
      status: 'Take Home',
      id: 1003,
    },
  ];

  const [applications, setApplications] = React.useState([]);

  React.useEffect(() => {
    fetchAllApplications();
  }, []);

  function fetchAllApplications() {
    fetch(`/dashboard/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => console.log(error));
  }

  const applicationCards = [];

  if (applications) {
    applications.forEach((app, index) => {
      const {
        company_name,
        job_post_link,
        resume_id,
        res_name,
        status,
        rating,
        id,
      } = app;
      applicationCards.push(
        <ApplicationCard
          key={id}
          id={id}
          userId={userId}
          company={company_name}
          link={job_post_link}
          rating={rating}
          resumeLabel={res_name}
          status={status}
        />
      );
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      {applicationCards}

      <AddApplication />
      <Button onClick={onOpen}>Add Resume</Button>
      <AddResume isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
