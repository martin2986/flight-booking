import React, { FC } from 'react';
import { logout } from '../auth/authRequest';
type DashboardProps = {};

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div>
      Logged IN Dashboard
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
