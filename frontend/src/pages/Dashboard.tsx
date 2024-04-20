import { accordionsData, textInfoData } from '../utils/util';
import HeroHeader from '../components/HeroHeader/Index';
import PopularDestination from '../components/PopularDestination/Index';
import TextInfo from '../components/TextInfo';
import Accordion from '../components/UI/Accordion';
import AppLayout from '../layout/AppLayout';

const Dashboard = () => {
  return (
    <AppLayout>
      <HeroHeader />
      <PopularDestination />
      <div className="grid md:grid-cols-3 gap-2 my-10 bg-gray-100">
        {textInfoData.map(({ title, description, icon }) => (
          <TextInfo title={title} description={description} icon={icon} key={icon} />
        ))}
      </div>
      <div>
        <h3 className="text-center text-xl mb-5">FAQ</h3>
        {accordionsData.map(({ title, description, id }) => (
          <Accordion title={title} description={description} key={id} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
