import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { app } from '@/utils/firebase';
import { authAction } from '@/redux/auth/authSlice';
import { authApi } from './apiClient';
import { Buttons } from '@/UI/Button';
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await authApi.post('/google', {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      dispatch(authAction.login(res.data));
      navigate('/');
    } catch (err) {
      console.error(`Can't Login`);
    }
  };
  return (
    <Buttons
      type="button"
      onClick={handleGoogleClick}
      variant="outline"
      className="bg-red-700 text-base-900 rounded-sm p-2 w-full uppercase hover:opacity-95"
    >
      <span className="mr-1.5">Continue with google </span>
      <FcGoogle className="text-base" />
    </Buttons>
  );
};

export default OAuth;
