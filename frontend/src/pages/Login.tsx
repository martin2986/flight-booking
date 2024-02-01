import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Buttons } from '../components/Button';
import Inputs from '../components/Inputs';
import AuthLayout from '../layout/AuthLayout';
import { login as loginAuth } from '../redux/auth/actions';
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type formFields = z.infer<typeof schema>;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      await dispatch(loginAuth({ loginData: data }));
      reset();
      navigate('/');
    } catch (err) {
      setError('root', {
        message: err?.response?.data?.message || 'An error occurred during login.',
      });
    }
  };

  return (
    <AuthLayout AUTH_TITLE="Sign In">
      {errors.root && <div className="text-red-500 text-sm mb-4">{errors.root.message}</div>}
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
          {isSubmitting ? 'Loading...' : 'Login'}
        </Buttons>
        <div className="flex flex-row items-center justify-between text-sm">
          <a href="/" className="text-black">
            Register Now!
          </a>
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
