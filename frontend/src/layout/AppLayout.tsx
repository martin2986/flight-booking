import { FC, ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto py-5">{children}</div>
    </div>
  );
};

export default AppLayout;
