export const menuVar = {
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: '100%', transition: { duration: 0.5 } },
  exit: { opacity: 0, width: 0 },
};

export const sideLinks = [
  {
    link: 'Update Profile',
    path: '/profile',
  },
  {
    link: 'Account',
    path: '/edit-account',
  },
  // {
  //   link: 'Settings',
  //   path: '/settings',
  // },
];
