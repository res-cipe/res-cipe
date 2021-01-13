import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import AddApplication from './AddApplication';
import AddResume from './AddResume';
import ApplicationCard from './ApplicationCard';

export default function Dashboard() {
  const props = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',

    company: 'Fucking Google',
    link:
      'https://www.linkedin.com/jobs/view/2208417001/?alternateChannel=search&refId=QayKwfbK20TiNXWx9cc8EA%3D%3D&trackingId=Ox84l426JPW8q3kqUloalg%3D%3D',
    reviewCount: 34,
    rating: 3,
    resumeLabel: 'Purple Header',
  };

  const [rating, setRating] = React.useState(1);

  // const applicationCards = [];

  // const React.useEffect(() => {
  //   // fetch all the applications for the user from the backend

  //   // once we have all the applications,
  //   // create an array of ApplicationCards
  //     applicationCards.push(<ApplicationCard
  //       key=
  //       company={props.company}
  //       link={props.link}
  //       rating={rating}
  //       resumeLabel={props.resumeLabel}
  //       updateRating={setRating}
  //     />)
  // })

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <ApplicationCard
        company={props.company}
        link={props.link}
        rating={rating}
        resumeLabel={props.resumeLabel}
        updateRating={setRating}
      />

      <AddApplication />
      <Button onClick={onOpen}>Add Resume</Button>
      <AddResume isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
