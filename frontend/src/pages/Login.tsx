import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDisPatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Buttons } from '../components/Button';
import Inputs from '../components/Inputs';
import AuthLayout from '../layout/AuthLayout';
import { login as loginAuth } from '../redux/auth/actions';
import Notification from '../components/UI/Notification';
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type formFields = z.infer<typeof schema>;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDisPatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      await dispatch(loginAuth({ loginData: data }));
      reset();
      navigate('/');
    } catch (err: any) {
      setError('root', {
        message: err?.response?.data?.message || 'An error occurred during login.',
      });
    }
  };

  return (
    <AuthLayout AUTH_TITLE="Log in to your account">
      {errors.root && <Notification message={errors.root.message} type="error" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          name="email"
          register={register}
          label="Email Address"
          error={errors?.email?.message}
          type="text"
        />
        <Inputs
          name="password"
          register={register}
          label="Password"
          error={errors?.password?.message}
          type="password"
        />

        <Buttons className="w-full mt-5" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Log In'}
        </Buttons>
        <div className="flex flex-row items-center justify-between text-sm mt-3">
          <Link to="/register" className="text-black underline">
            Sign Up
          </Link>
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500 hover:scale-105"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
