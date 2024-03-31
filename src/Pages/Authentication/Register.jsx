import { Button, TextField } from '@mui/material/';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import { useDispatch } from 'react-redux';
import { userRegisterAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '', // Set a default value for gender
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  gender: Yup.string().required('Gender is required'), // Ensure gender is required
});

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log('Handle submit called');
    console.log('Form values:', values);
    dispatch(userRegisterAction({data:values}));
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div style={{ marginBottom: '1rem' }}>
          <Field
            name="firstName"
            placeholder="First Name"
            type="text"
            as={TextField}
            variant="outlined"
            fullWidth
          />
          <ErrorMessage name="firstName" component="div" className="text-red-500" />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Field
            name="lastName"
            placeholder="Last Name"
            type="text"
            as={TextField}
            variant="outlined"
            fullWidth
          />
          <ErrorMessage name="lastName" component="div" className="text-red-500" />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Field
            name="email"
            placeholder="Email"
            type="email"
            as={TextField}
            variant="outlined"
            fullWidth
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Field
            name="password"
            placeholder="Password"
            type="password"
            as={TextField}
            variant="outlined"
            fullWidth
          />
          <ErrorMessage name="password" component="div" className="text-red-500" />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <FormLabel component="legend">Gender</FormLabel>
          <Field name="gender" as={RadioGroup}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </Field>
          <ErrorMessage name="gender" component="div" className="text-red-500" />
        </div>

        <Button sx={{ padding: '.8rem 0rem', marginBottom: '1rem' }} fullWidth type="submit" variant="contained" color="primary">
          Register
        </Button>
      </Form>
    </Formik>

      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>Already have account ?</p>
        <Button onClick={()=>navigate("/login")}>Login</Button>
      </div>
    </>
  );
};

export default Register;
