import Input from '../../common/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './signup.css';
import { Link, useNavigate, withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signupUser } from '../../services/singUpService';
import { useAuth, useAuthActions } from '../../providers/AuthProvider';
// import { signupUser } from '../../services/sinupService';
// import { useAuthActions, useAuth } from '../../Providers/AuthProvider';
// import { useQuery } from '../../hooks/useQuery';

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};
// 2.

// 3.
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(6, 'Name length is not valid'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^[0-9]{11}$/, 'Invalid Phone Number')
    .nullable(),
  password: Yup.string().required('Password is required'),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // )
  passwordConfirm: Yup.string()
    .required('Pasword Confirmation is Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignupForm = () => {
  //   const query = useQuery();
  //   const redirect = query.get('redirect') || '/';
  const setAuth = useAuthActions();
  const auth = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (auth) history.push(redirect);
  //   }, [redirect, auth]);

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    // console.log(values);
    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };
    try {
      const { data } = await signupUser(userData);
      console.log(data);
      setAuth(data);
      localStorage.setItem('authState', JSON.stringify(data));
      setError(null);
      navigate('/');
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
    // try {
    //   const { data } = await signupUser(userData);
    //   setAuth(data);
    //   // localStorage.setItem("authState", JSON.stringify(data));
    //   setError(null);
    //   history.push(redirect);
    // } catch (error) {
    //   // console.log(error.response.data.message);
    //   if (error.response && error.response.data.message)
    //     setError(error.response.data.message);
    // }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="fromContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password confirmation"
          type="password"
        />
        <button
          style={{ width: '100%' }}
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          Signup
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: '15px' }}>Already login?</p>
        </Link> */}
      </form>
    </div>
  );
};

export default SignupForm;
