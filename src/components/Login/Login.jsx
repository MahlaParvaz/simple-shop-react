import Input from '../../common/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/loginService';
import { useEffect, useState } from 'react';
import { useAuth, useAuthActions } from '../../providers/AuthProvider';
import { useQuery } from '../../hooks/useQuery';

const initialValues = {
  email: '',
  password: '',
};
// 2.

// 3.
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const setAuth = useAuthActions();
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const query = useQuery();
  const redirect = query.get('redirect') || '/';

  useEffect(() => {
    if (auth) navigate(redirect);
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      // localStorage.setItem('authState', JSON.stringify(data));
      setError(null);
      navigate(redirect);
    } catch (error) {
      if (error.response && error.response.data.message)
        setError(error.response.data.message);
    }
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
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />

        <button
          style={{ width: '100%' }}
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to={`/signup?redirect=${redirect}`}>
          <p style={{ marginTop: '15px' }}>Not signup yet ?</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
