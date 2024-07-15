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
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide>
          <a href="./anime?id=11"><img src="./banner1.png" alt="banner" className="slide-image1" /></a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="./anime?id=720"><img src="./banner2.png" alt="banner" className="slide-image2" /></a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="./anime?id=12"><img src="./banner3.png" alt="banner" className="slide-image3" /></a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
