import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css/effect-fade'
import 'swiper/css';
import './slider.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'

const sliderImages = [
    {id:'1', Image: './banner1.png'},
    {id:'2', Image: './banner2.png'},
    {id:'3', Image: './banner3.png'},
]

function Slider(){
    return (
        <div className='container'>
            <Swiper 
            slidesPerView={1}
            pagination={{clickble: true}}
            modules={[EffectFade, Pagination, Navigation]}
            effect='fade'
            loop={true}
            navigation
            >
                {sliderImages.map((item)=>(
                    <SwiperSlide key={item.id}>
                        <img src={item.Image} 
                        alt='banner'
                        className='slide-image'/>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default Slider;