import { FC } from 'react';
import HeroHeader from '../components/HeroHeader/Index';
type DashboardProps = {};
const Dashboard: FC<DashboardProps> = () => {
  return (
    <div className="app">
      <HeroHeader />
    </div>
  );
};

export default Dashboard;
