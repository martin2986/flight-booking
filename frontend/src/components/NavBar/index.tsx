import { FC, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { menuVar, navLinks, mobileLinks } from './navUtil';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineClose } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { buttonVariants } from '../Button';
type NavProps = {};

const Index: FC<NavProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(navLinks[0].link);
  const location = useLocation();
  let bg;
  if (location?.pathname !== '/') {
    bg = 'bg-gray-100 ';
  }
  const handleNavigation = (selected: string) => {
    setIsActive(selected);
  };
  return (
    <div className={`${bg} text-black`}>
      <nav className="container mx-auto flex justify-between p-1  items-center ">
        <div className="text-xl lg:flex-1">
          <Link to="/">Flight</Link>
        </div>
        <div className="lg:hidden cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
          <RxHamburgerMenu />
        </div>

        <ul className=" hidden  lg:flex flex-row lg:gap-x-8 text-sm">
          {navLinks.map(({ link, path }) => (
            <li key={link} onClick={() => handleNavigation(link)}>
              <Link to={path}>{link}</Link>
              {isActive === link && (
                <motion.div
                  layoutId="active-nav"
                  className="border-b-2 border-transparent border-b-black"
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden justify-end lg:flex lg:flex-1 ">
          <Link to="login" className={buttonVariants({ variant: 'borderLess', size: 'sm' })}>
            Register
          </Link>
          <Link to="login" className={buttonVariants({ size: 'sm' })}>
            Sign in
          </Link>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVar}
            initial="initial"
            animate="animate"
            exit="exit"
            className="lg:hidden min-h-screen"
            role="dialog"
          >
            <div className="fixed inset-y-0 z-50 right-0  w-full overflow-y-auto  bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <div className=" ">
                  <Link to="/">Flight</Link>
                </div>
                <div className=" cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
                  <MdOutlineClose />
                </div>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navLinks.map(({ link, path }) => (
                      <motion.div
                        key={link}
                        variants={mobileLinks}
                        initial="initial"
                        animate="animate"
                      >
                        <Link
                          className="-mx-3 px-3 block text-sm font-semibold py-2 leading-7 hover:bg-gray-100"
                          to={path}
                          onClick={() => setIsOpen((prev) => !prev)}
                        >
                          {link}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
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
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
