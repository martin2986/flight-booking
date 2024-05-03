import 'swiper/css';
import { A11y, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import img4 from '../../assets/bali.jpg';
import img2 from '../../assets/frankfurt.jpg';
import img3 from '../../assets/madrid.jpg';
import img6 from '../../assets/paris.jpg';
import img5 from '../../assets/venice.jpg';
import img1 from '../../assets/warsaw.jpg';
import Card from './Card';

const Index = () => {
  return (
    <div className="mt-5">
      <h3>Popular Destination</h3>
      <p className="text-sm">Find deals on domestic and international flights</p>

      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log('slide change')}
        navigation
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Card country="Warsaw, Poland" image={img1} />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Bali, Indonesia" image={img4} />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Frankfurt, Germany" image={img2} />{' '}
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Madrid, Spain" image={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Venice, Italy" image={img5} />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Paris, France" image={img6} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Index;
