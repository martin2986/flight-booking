import { FC } from 'react';
import HeroHeader from '../components/HeroHeader/Index';
import PopularDestination from '../components/PopularDestination/Index';
import TextInfo from '../components/TextInfo';
import img1 from '../assets/ticket-flight.png';
import img2 from '../assets/airplane.png';
import img3 from '../assets/travel.png';
import Accordion from '../components/UI/Accordion';
type DashboardProps = {};
const Dashboard: FC<DashboardProps> = () => {
  return (
    <div>
      <HeroHeader />
      <PopularDestination />
      <div className="grid md:grid-cols-3 gap-2 my-10 bg-gray-100">
        <TextInfo
          title="Get more flexibility"
          description="Change your travel dates with the Flexible tickets option*"
          icon={img1}
          alt=" Flat-icons-com"
        />
        <TextInfo
          title="24/7 Assistance"
          description="For your peace-of-mind, your trip includes the 'Dohop Connection Service'. If your connecting flight is delayed or cancelled, our partner, Dohop, will rebook you on an alternative flight to your final destination."
          icon={img2}
          alt=" Flat-icons-com"
        />
        <TextInfo
          title="Search a huge selection"
          description="Easily compare flights, airlines, and prices – all in one place"
          icon={img3}
          alt=" Flat-icons-com"
        />
      </div>
      <div>
        <h3 className="text-center text-xl mb-5">FAQ</h3>
        <Accordion
          title="How do I find the cheapest flights on Booking.com?"
          description="You can sort flights by price to see them from cheapest to most expensive. To find the cheapest flights, you also need to consider factors like when you're booking and want to travel."
        />
        <Accordion
          title="Can I book one-way flights on Booking.com?"
          description="Yes, you can book one-way, round-trip, and multi-city flights on our site."
        />
        <Accordion
          title="How far in advance can I book a flight?"
          description="You can book a flight up to one year before your departure date."
        />
        <Accordion
          title="What is a flexible ticket?"
          description="A flexible ticket allows you to change your flight with the same airline by only paying the fare and tax difference. It can only be used for one confirmed change. You can add the flexible ticket when booking your flight."
        />
        <Accordion
          title="Does Booking.com charge credit card fees?"
          description="No, we don't charge any credit card fees. You can always see exactly what you’re paying for in the price breakdown when reviewing your booking."
        />
        <Accordion
          title="Do flights get cheaper closer to departure?"
          description="Generally, flight prices are more likely to increase the closer you get to your flight date."
        />
      </div>
    </div>
  );
};

export default Dashboard;
