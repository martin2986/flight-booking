import PopularDestination from '@/components/PopularDestination/PopularDestination';
import SearchFlight from '@/features/SearchFlight/SearchFlight';
import SearchFLightLayout from '@/features/SearchFlight/SearchFLightLayout';
import TextInfo from '../components/TextInfo';
import Accordion from '../UI/Accordion';
import { accordionsData, textInfoData } from '../utils/data';

const Dashboard = () => {
  return (
    <>
      <div className="px-2">
        <header className=" container mx-auto">
          <h1 className="text-xl text-base-light w-2/4 mb-6 md:text-4xl pt-14">
            Where are you <strong>Flying</strong> to?
          </h1>
          <SearchFLightLayout>
            <SearchFlight />
          </SearchFLightLayout>
        </header>
        <main>
          <PopularDestination />
          <div className="grid md:grid-cols-3 gap-4 my-10 bg-gray-100 text-base-900">
            {textInfoData.map(({ title, description, icon }) => (
              <TextInfo title={title} description={description} icon={icon} key={icon} />
            ))}
          </div>
          <div className="mb-5 text-base-900">
            <h3 className="text-center text-xl mb-5">FAQ</h3>
            {accordionsData.map(({ title, description, id }) => (
              <Accordion title={title} description={description} key={id} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
