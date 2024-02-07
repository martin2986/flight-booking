import { FC } from 'react';
import { menuVar, mobileLinkAnimation } from './NavBar/navUtil';
import { motion } from 'framer-motion';
import UserIcon from './UserIcon';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { buttonVariants } from './Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/actions';
type SideBarProps<T> = {
  setIsOpen: T;
  type: 'side' | 'nav';
  listItems: T[];
};

const SideBar: FC<SideBarProps<T>> = ({ setIsOpen, type, listItems }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logout());
  };
  return (
    <motion.div
      variants={menuVar}
      initial="initial"
      animate="animate"
      exit="exit"
      className={` fixed inset-y-0 z-50 right-0  w-full h-full overflow-y-auto  bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10${type === 'nav' ? 'lg:hidden min-h-screen ' : ''}`}
      role="dialog"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* top */}
          <div className="flex flex-row  items-center justify-between">
            <div className=" flex flex-row items-center justify-between">
              {isLoggedIn ? (
                <UserIcon userName={user.name} id="wew" />
              ) : (
                <h3 className="text-base font-semibold leading-7 ">Flight</h3>
              )}
            </div>
            <div className=" cursor-pointer" onClick={() => setIsOpen((prev: boolean) => !prev)}>
              <MdOutlineClose />
            </div>
          </div>

          <div className="mt-6  flow-root ">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {listItems.map(({ link, path }) => (
                  <motion.div
                    key={link}
                    variants={mobileLinkAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    <Link
                      className="-mx-3 px-3 block text-sm font-semibold leading-7 py-2  hover:bg-gray-100"
                      to={path}
                      onClick={() => setIsOpen((prev: boolean) => !prev)}
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            {!isLoggedIn && (
              <div className="flex items-center">
                <Link
                  to="login"
                  className={buttonVariants({
                    variant: 'borderless',
                  })}
                >
                  Register
                </Link>
                <Link to="login" className={buttonVariants({ size: 'sm' })}>
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
        {isLoggedIn && (
          <div className=" -mx-3 px-3 block text-sm font-semibold py-2 leading-7 hover:bg-gray-100">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SideBar;
