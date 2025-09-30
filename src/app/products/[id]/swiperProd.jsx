"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperProducts = ({ images }) => {
  return (
    <div className="swiperImagesContainer">
      {/* ✅ Mobile view: Swiper */}
      <div className="block sm:hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
        >
          {images.map((prodImg, index) => (
            <SwiperSlide key={index}>
              <div className="h-[50vh] flex justify-center items-center border">
                <img
                  src={prodImg}
                  alt={`product-${index}`}
                  className="h-[50vh] object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Tablet / Desktop view: Flex */}
      <div className="hidden sm:flex justify-center gap-4">
        {images.map((prodImg, index) => (
          <div key={index} className="flex-1 flex justify-center border">
            <img
              src={prodImg}
              alt={`product-${index}`}
              className="h-[50vh] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwiperProducts;
