import { FC, ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white ">
      <div className="container md:mx-auto p-1">{children}</div>
    </div>
  );
};

export default AppLayout;
