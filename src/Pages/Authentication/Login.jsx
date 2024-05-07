import { Button, TextField, createTheme } from '@mui/material/';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { userLoginAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(88,199,250)"
    },
    secondary: {
      main: "#SA20CB"
    },
    background: {
      main: "#212534",
      default: "#212534",
      paper: "#212534"
    },
  }
});

const initialValue = { email: "", password: "" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required('Password is required')
});

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("handle submit", values);
    dispatch(userLoginAction({ data: values }));
  };

  return (
    <div style={{ backgroundColor: darkTheme.palette.background.default, color: darkTheme.palette.text.primary }}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValue}
        validationSchema={validationSchema}
        
      >
        <Form>
          <div style={{ marginBottom: '1rem' }}>
            <Field
              name='email'
              placeholder='Email'
              type='email'
              as={TextField}
              variant='outlined'
              fullWidth
              
            />
            <ErrorMessage name='email' component='div' className='text-red-500' />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <Field
              name='password'
              placeholder='Password'
              type='password'
              as={TextField}
              variant='outlined'
              fullWidth
            />
            <ErrorMessage name='password' component='div' className='text-red-500' />
          </div>

          <Button sx={{ padding: '.8rem 0rem', marginBottom: '1rem' }} fullWidth type="submit" variant='contained' color='primary'>
            Login
          </Button>
        </Form>
      </Formik>

      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>If you don't have an account</p>
        <Button onClick={() => navigate("/signup")}>Register</Button>
      </div>
    </div>
  );
};

export default Login;
