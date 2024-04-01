import { FC, ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen ">
      <div className=" container mx-auto px-2 md:px-3 py-5">{children}</div>
    </div>
  );
};

export default AppLayout;
