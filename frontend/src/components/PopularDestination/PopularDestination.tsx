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
          <Card country="Venice, Italy" image={img5} hash="LeG9{mE*R+WBysM{jYof9_jZt7ae" />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="California, USA" image={img4} hash="LxM7fPD*t7a#_NoINGs:IqofWBkC" />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Frankfurt, Germany" image={img2} hash="LTH1on-SRPEL.Axas8oL0fX9j?oz" />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Paris, France" image={img6} hash="LwHV*sbvjEayyZazaxa|EQjFWBj[" />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Madrid, Spain" image={img3} hash="LZD0cQs.J8W=~VnOIoWB?GWBM{R*" />
        </SwiperSlide>
        <SwiperSlide>
          <Card country="Amsterdam, Netherlands" image={img1} hash="LwGvO}t7j[f6_4e.axj[tnofjufk" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PopularDestination;
