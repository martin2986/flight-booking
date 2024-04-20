import { motion } from 'framer-motion';
import { FC } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { logout } from '../redux/auth/AuthAction';
import { useAppSelector, useDisPatch } from '../redux/hooks';
import { buttonVariants } from './Button';
import UserIcon from './UserIcon';
import { sideLinks } from './NavBar/navUtil';
import { menuVar, mobileLinkAnimation } from './NavBar/navUtil';
type SideBarProps = {
  setIsOpen: () => void;
  type: 'side' | 'nav';
};

const SideBar: FC<SideBarProps> = ({ setIsOpen, type }) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);

  const dispatch = useDisPatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <motion.nav
      variants={menuVar}
      initial="initial"
      animate="animate"
      exit="exit"
      className={` fixed inset-y-0 z-50 right-0  w-full h-full overflow-y-auto  bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10${type === 'nav' ? 'lg:hidden min-h-screen ' : ''}`}
      role="dialog"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-row  items-center justify-between pb-3 border-b">
            <div className=" flex flex-row items-center justify-between ">
              {isLoggedIn ? (
                <UserIcon />
              ) : (
                <h3 className="text-base font-semibold leading-7 ">Flight</h3>
              )}
              {isLoggedIn && (
                <Link
                  to="profile"
                  onClick={setIsOpen}
                  className=" cursor-pointer hover:text-gray-600"
                >
                  <h3>{user.name}</h3>
                  <h3 className="text-sm hover:text-gray-600">{user.email}</h3>
                </Link>
              )}
            </div>
            <div className=" cursor-pointer" onClick={setIsOpen}>
              <MdOutlineClose />
            </div>
          </div>
          {isLoggedIn && (
            <div className="mt-6  flow-root ">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {sideLinks.map(({ link, path }) => (
                    <motion.div
                      key={link}
                      variants={mobileLinkAnimation}
                      initial="initial"
                      animate="animate"
                    >
                      <Link
                        className="-mx-3 px-3 block text-sm font-semibold leading-7 py-2  hover:bg-gray-100"
                        to={path}
                        onClick={setIsOpen}
                      >
                        {link}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="mt-6  flow-root ">
            {!isLoggedIn && (
              <div className="flex items-center gap-2 mt-3">
                <Link
                  to="login"
                  style={{ color: 'black' }}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
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
    </motion.nav>
  );
};

export default SideBar;
