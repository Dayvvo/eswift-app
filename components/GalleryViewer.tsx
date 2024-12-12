import { Box } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Image } from "@chakra-ui/react";


export const GalleryView = ()=> {

    const gallery: any[] = ['/contact.png','/contact.png','/contact.png']
    return(
        <Box>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    gallery.map((item)=>(
                        <SwiperSlide key={item}>
                            <Image src={`${item}`} alt="" width={'500px'} height={'100%'} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    )
}