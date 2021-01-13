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
      company: 'Fucking Google',
      link:
        'https://www.linkedin.com/jobs/view/2208417001/?alternateChannel=search&refId=QayKwfbK20TiNXWx9cc8EA%3D%3D&trackingId=Ox84l426JPW8q3kqUloalg%3D%3D',
      reviewCount: 34,
      rating: 3,
      resumeLabel: 'Purple Header',
      status: 'Interested',
      id: 1001,
    },
    {
      company: 'Facebook',
      link: 'facebook.com',
      rating: 5,
      resumeLabel: 'More Pedestrian',
      status: 'Offer',
      id: 1002,
    },
    {
      company: 'LinkedIn',
      link: 'linkedin.com',
      rating: 1,
      resumeLabel: 'More Pedestrian',
      status: 'Take Home',
      id: 1003,
    },
  ];

  const [rating, setRating] = React.useState(props.rating);

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
          resumeLabel={resume_id}
          status={status}
          fetchAllApplications={fetchAllApplications}
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
