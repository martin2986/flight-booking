import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDisPatch } from '../redux/hooks';
import { z } from 'zod';
import { Buttons } from '../components/Button';
import AuthLayout from '../layout/AuthLayout';
import { registerFormSchema } from '../utils/formSchema';
import { register as registerAuth } from '../redux/auth/actions';
import Inputs from '../components/Inputs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
type formFields = z.infer<typeof registerFormSchema>;

const Register = () => {
  const dispatch = useDisPatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      await dispatch(registerAuth({ registerData: data }));
      reset();
      navigate('/verify');
    } catch (err) {
      setError('root', {
        message: err.response.data.message || 'An error occurred during login.',
      });
    }
  };
  return (
    <AuthLayout AUTH_TITLE="Sign Up">
      {errors.root && <div className="text-red-500 text-sm mb-4">{errors.root.message}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Inputs
          label="Name"
          name="name"
          type="text"
          register={register}
          error={errors?.name?.message}
        />
        <Inputs
          name="email"
          label="Email"
          type="email"
          register={register}
          error={errors?.email?.message}
        />
        <Inputs
          name="password"
          label="Password"
          type="password"
          register={register}
          error={errors?.password?.message}
        />
        <Inputs
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          register={register}
          error={errors?.confirmPassword?.message}
        />

        <Buttons className="w-full mt-5" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Sign Up'}
        </Buttons>
        <Link to="/login" className="text-black text-sm">
          Login Now!
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Register;
