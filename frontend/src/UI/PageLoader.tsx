import { SlPlane } from 'react-icons/sl';

const PageLoader = () => {
  return (
    <div className="w-screen h-screen inline-flex justify-center items-center bg-base-light">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-28 h-28 border-8 text-base-900 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
          <SlPlane className="animate-ping" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
