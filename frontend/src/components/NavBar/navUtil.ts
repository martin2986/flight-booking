export const menuVar = {
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: '100%', transition: { duration: 0.5 } },
  exit: { opacity: 0, width: 0 },
};

export const mobileLinkAnimation = {
  initial: {
    y: '300vh',
    transition: {
      duration: 0.5,
    },
    open: {
      y: '0',
      transition: {
        duration: 0.7,
      },
    },
  },
};

export const sideLinks = [
  {
    link: 'Update Profile',
    path: '/profile',
  },
  {
    link: 'Settings',
    path: '/settings',
  },
];
