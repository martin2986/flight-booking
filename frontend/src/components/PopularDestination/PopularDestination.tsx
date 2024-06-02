import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import img4 from '@/assets/califonia.webp';
import img2 from '@/assets/frankfurt.webp';
import img3 from '@/assets/madrid.webp';
import img6 from '@/assets/paris.webp';
import img5 from '@/assets/venice.webp';
import img1 from '@/assets/amsterdam.webp';
import Card from './Card';

const PopularDestination = () => {
  return (
    <div className="mt-28 text-base-900">
      <h3 className="text-xl font-semibold">Popular Destination</h3>
      <p className="text-sm">Find deals on domestic and international flights</p>

      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <Card country="Venice, Italy" image={img5} />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="California, USA" image={img4} />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Frankfurt, Germany" image={img2} />{' '}
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Paris, France" image={img6} />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Madrid, Spain" image={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Amsterdam, Netherlands" image={img1} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PopularDestination;
