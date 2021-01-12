import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';

export default function Signup() {
  const [showPass, setShow] = React.useState(false);
  const [showConf, setConf] = React.useState(false);
  const clickPass = () => setShow(!showPass);
  const clickConf = () => setConf(!showConf);

  return (
    <Box>
      <Formik
        initialValues={{}}
        validate={(values) => {
          const errors = {};
          const {
            email,
            username,
            firstName,
            lastName,
            password,
            confirmPass,
          } = values;

          if (!email) {
            errors.email = 'Required';
          } else if (email.length < 4 || email.length > 100) {
            errors.email =
              'Email address must be between 4-100 characters long, please try again';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = 'Invalid email address';
          }

          if (!username) {
            errors.username = 'Required';
          } else if (username.length < 4 || username.length > 15) {
            errors.username = 'Username must be between 4-15 characters long';
          } else if (!username.match(/^[A-Za-z0-9_-]+$/)) {
            errors.username =
              'Username can only contain letters, numbers, or underscores';
          }

          if (!firstName) errors.firstName = 'Required';

          if (!lastName) errors.lastName = 'Required';

          if (!password) {
            errors.password = 'Required';
          } else if (password.length < 8 || password.length > 100) {
            errors.password = 'Password must be between 8-100 characters long';
          } else if (
            !password.match(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/
            )
          ) {
            errors.password =
              'Must include one lowercase character, one uppercase character, a number, and a special character';
          }

          if (!confirmPass) errors.confirmPass = 'Required';

          if (confirmPass !== password)
            errors.confirmPass = 'Passwords do not match';

          return errors;
        }}
        onSubmit={(values, actions) => {
          const { email, username, firstName, lastName, password } = values;
          setTimeout(() => {
            alert(
              JSON.stringify(
                {
                  email,
                  username,
                  first_name: firstName,
                  last_name: lastName,
                  password,
                },
                null,
                2
              )
            );
            actions.setSubmitting(false);
            // double check the endpoint, make sure the fetch request is built proper
            fetch('./signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName,
              }),
            });
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Field name='username'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor='username'>Username</FormLabel>
                  <Input
                    {...field}
                    id='username'
                    placeholder='4 to 15 characters'
                    required='true'
                  />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='email'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor='email'>Email Address</FormLabel>
                  <Input
                    {...field}
                    id='email'
                    placeholder='email'
                    required='true'
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='firstName'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.firstName && form.touched.firstName}
                >
                  <FormLabel htmlFor='firstName'>First Name</FormLabel>
                  <Input
                    {...field}
                    id='firstName'
                    placeholder='required'
                    required='true'
                  />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='lastName'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.lastName && form.touched.lastName}
                >
                  <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                  <Input {...field} id='lastName' placeholder='required' />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id='password'
                      required='true'
                      type={showPass ? 'text' : 'password'}
                      placeholder='must include one lowercase character, one uppercase character, a number, and a special character'
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={clickPass}>
                        {showPass ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='confirmPass'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.confirmPass && form.touched.confirmPass
                  }
                >
                  <FormLabel htmlFor='confirmPass'>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id='confirmPass'
                      required='true'
                      type={showConf ? 'text' : 'password'}
                      placeholder='Make sure she matches!'
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={clickConf}>
                        {showConf ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.confirmPass}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
