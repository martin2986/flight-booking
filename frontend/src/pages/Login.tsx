import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Buttons } from '../UI/Button';
import Inputs from '../components/Inputs';
import Notification from '../UI/Notification';
import AuthLayout from '../layout/AuthLayout';
import { login as authLogin } from '../redux/auth/AuthAction';
import { useDisPatch } from '../redux/hooks';
import OAuth from '@/services/auth/OAuth';
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
      await dispatch(authLogin(data));
      reset();
      navigate('/');
    } catch (err: any) {
      setError('root', {
        message: err?.response?.data?.message || 'An error occurred during login.',
      });
    }
  };

  return (
    <AuthLayout AUTH_TITLE="Sign In">
      {errors.root && <Notification message={errors.root.message} type="error" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          name="email"
          register={register}
          label="Email"
          error={errors?.email?.message}
          type="text"
          placeholder="Email"
        />
        <Inputs
          name="password"
          register={register}
          label="Password"
          error={errors?.password?.message}
          type="password"
          placeholder="Password"
        />

        <Buttons className="w-full mt-5" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Log In'}
        </Buttons>
        <p className="uppercase my-2 text-xs text-center ">or</p>
        <OAuth />
        <div className="flex flex-row items-center justify-between text-sm mt-6">
          <div>
            <span className="mr-1">Don't have an account?</span>
            <Link
              to="/register"
              className="font-semibold hover:text-base-500 transition ease-in-out duration-300"
            >
              Sign up!
            </Link>
          </div>
          <Link
            to="/"
            className="font-semibold hover:text-base-500 transition ease-in-out duration-300"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
