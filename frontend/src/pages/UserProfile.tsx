import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Buttons } from '../UI/Button';
import Inputs from '../components/Inputs';
import Notification from '../UI/Notification';
import UserLayout from '../layout/UserLayout';
import { updateMe } from '../redux/auth/AuthAction';
import { useAppSelector, useDisPatch } from '../redux/hooks';
import { app } from '@/utils/firebase';
type formFields = {
  name: string;
  email: string;
  profilePhoto: string;
};

const UserProfile = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  const [imagePercent, setImagePercent] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageData, setImageData] = useState<any>();
  const dispatch = useDisPatch();
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<formFields>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      profilePhoto: user?.profilePhoto || '',
    },
  });
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error: any) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setImageData(downloadURL));
      },
    );
  };

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      await dispatch(
        updateMe({
          name: data?.name,
          email: data?.email,
          profilePhoto: imageData,
        }),
      );
    } catch (err: any) {
      setError('root', {
        message: err.response.data.message || 'An error occurred while updating you info',
      });
    }
  };
  return (
    <UserLayout>
      <div className=" w-full px-4 mx-auto">
        {errors.root && <Notification type="error" message={errors.root.message} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center flex flex-col justify-center">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <input
              type="file"
              name="image"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setImage(e.target.files?.[0]);
              }}
            />
            <img
              src={user.profilePhoto || imageData}
              alt="profile"
              className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
              onClick={() => fileRef?.current?.click()}
            />
            <p className="text-sm self-center">
              {imageError ? (
                <span className="text-red-700">
                  Error uploading image (file size must be less than 2 MB)
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-700">Image uploaded successfully</span>
              ) : (
                ''
              )}
            </p>
          </div>
          <Inputs
            register={register}
            name="name"
            label="Name"
            type="text"
            placeholder={user.name}
          />
          <Inputs
            register={register}
            name="email"
            label="Email"
            type="text"
            placeholder={user.email}
            disabled
          />
          <Buttons className="w-24 " disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Update'}
          </Buttons>
        </form>
        {errors.root && (
          <div className="text-red-500 text-sm mb-4">
            {errors.root.message || 'Something went wrong'}
          </div>
        )}
        <p className="text-green-700 mt-5">
          {isSubmitSuccessful && 'User is updated successfully!'}
        </p>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
