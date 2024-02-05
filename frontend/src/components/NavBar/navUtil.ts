export const menuVar = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: { duration: 1, ease: [0.12, 0, 0.59, 1] },
  },
  exit: {
    scaleY: 0,
    transition: { duration: 0.5, ease: [0.12, 0, 0.39, 1] },
  },
};
export const navLinks = [
  {
    link: ' All Flight',
    path: '/',
  },
  {
    link: 'Schedule',
    path: 'schedules',
  },
  {
    link: 'Manage Bookings',
    path: '/bookings',
  },
];
export const mobileLinks = [
  {
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
  },
];
