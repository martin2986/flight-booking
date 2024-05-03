import SearchFLightLayout from '../../layout/SearchFLightLayout';
import { Buttons } from '../Button';
import SearchFlight from '../SearchFLight/SearchFlight';

const Index = () => {
  return (
    <div className=" container mx-auto">
      <div className=" top-24 mb-8">
        <h1 className="text-xl w-2/4 mb-6 md:text-4xl pt-14">
          Hey Buddy! where are you <strong>Flying</strong> to?
        </h1>
        <Buttons variant="borderless" className="hover:scale-125">
          Explore &rarr;
        </Buttons>
      </div>
      <SearchFLightLayout>
        <SearchFlight />
      </SearchFLightLayout>
    </div>
  );
};

export default Index;
