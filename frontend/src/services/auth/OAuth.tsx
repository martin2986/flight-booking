import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '@/utils/firebase';
import { authAction } from '@/redux/auth/authSlice';
import { authApi } from './apiClient';
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
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-sm p-2 w-full uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
