import React from 'react';
import {
  Box,
  Image,
  Badge,
  Link,
  IconButton,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export default function ApplicationCard(props) {
  const [rating, setRating] = React.useState(props.rating);
  const [status, setStatus] = React.useState(props.status);

  function updateApplication(update, value) {
    let updateString = '';
    if (update.rating) updateString = `/dashboard/${props.userId}/rating`;
    else if (update.status) updateString = `/dashboard/${props.userId}/status`;
    fetch(updateString, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
      .then((response) => {
        if (update.rating) setRating(update.rating);
        else if (update.status) setStatus(update.status);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      {/* <Image src={props.imageUrl} alt={props.imageAlt} /> */}

      <Box p='6'>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          {props.company}
        </Box>
        <Box d='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            {props.resumeLabel}
          </Badge>
        </Box>

        <Box>
          <Link href={props.link} isExternal>
            OG Post
          </Link>
        </Box>

        <FormControl id='status'>
          <Select
            size='sm'
            value={status}
            onChange={(e) => {
              updateApplication({ status: e.target.value, id: props.id });
            }}
          >
            <option disabled>{status}</option>
            <option>Wishlist</option>
            <option>Applied</option>
            <option>Interview Scheduled</option>
            <option>Interview</option>
            <option>Take Home</option>
            <option>Offer</option>
            <option>Offer Declined</option>
            <option>Rejected</option>
          </Select>
        </FormControl>

        <Box d='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <IconButton
                key={`star${i}`}
                color={i < rating ? 'teal.500' : 'gray.300'}
                background='none'
                size='sm'
                icon={<StarIcon />}
                onClick={() => {
                  // props.updateRating(i + 1)
                  // setRating(i + 1);
                  updateApplication({ rating: i + 1, id: props.id });
                }}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
}
