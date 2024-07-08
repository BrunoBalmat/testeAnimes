import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/swiper-bundle.css";
import "./slider.css";

function Slider() {
  return (
    <div className="container">
      <Swiper
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        <SwiperSlide>
          <img src="./banner1.png" alt="banner" className="slide-image1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner2.png" alt="banner" className="slide-image2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner3.png" alt="banner" className="slide-image3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
