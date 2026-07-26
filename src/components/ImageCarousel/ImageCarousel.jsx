"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import PrimaryButton from "../ui/Button";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const ImageCarousel = ({ propertyImages }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiperHeight, setSwiperHeight] = useState(450);
  const [swiperBottomHeight, setBottomSwiperHeight] = useState(400);
  const [thumbsDirection, setThumbsDirection] = useState("vertical");
  const [containerStyle, setContainerStyle] = useState({
    width: "100%",
    maxWidth: "100%",
  });
  const [thumbnailStyle, setThumbnailStyle] = useState({
    maxWidth: "100%",
    width: "100%",
  });
  const [thumbInnerStyle, setThumbInnerStyle] = useState("80%");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setContainerStyle({ width: "80%", maxWidth: "80%" });
        setThumbnailStyle({ maxWidth: "20%", width: "20%" });
        setThumbInnerStyle("90%");
      } else {
        setContainerStyle({ width: "100%", maxWidth: "100%" });
        setThumbnailStyle({ maxWidth: "100%", width: "100%" });
        setThumbInnerStyle("100%");
      }
    };


    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setSwiperHeight(200);
      } else if (window.innerHeight < 1000) {
        setSwiperHeight(400);
      } else {
        setSwiperHeight(450);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setBottomSwiperHeight(60);
      } else if (window.innerWidth < 768) {
        setBottomSwiperHeight(80);
      } else if (window.innerWidth < 1024) {
        setBottomSwiperHeight(150);
      } else {
        setBottomSwiperHeight(400);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1016) {
        setThumbsDirection("horizontal");
      } else {
        setThumbsDirection("vertical");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!propertyImages || propertyImages.length === 0) {
    return <p className="text-center text-gray-500">No images available</p>;
  }
  const handleCall = () => {
    window.location.href = 'tel:+8801841999922';
  };

  const handleWhatsApp = () => {
    const message = "Hello, I'm interested in booking a package on MV Teknaf.";
    const url = `https://wa.me/8801841999922?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  return (
    <div className="py-10">
      <h4 className="text-3xl text-center text-blue-950  py-8 lg:text-3xl font-bold mb-4">
        Photo <span className="text-red-700">Gallery</span>
      </h4>
      <div
        className="flex lg:flex-row flex-col items-start gap-4 mx-auto bg-[#EBF0F4]"
        style={{ maxWidth: "90%" }}
      >
        <div className="relative" style={containerStyle}>
          <Swiper
            loop={true}
            spaceBetween={2}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
            className="mySwiper2 swiper-instance-two"
            pagination={{ clickable: true }}
            style={{ height: `${swiperHeight}px`, maxWidth: "100%" }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              swiper.autoplay.stop();
            }}
          >
            {propertyImages.map((image, index) => (
              <SwiperSlide key={index} className="w-[100%] h-[100%]">
                <div className="relative rounded-xl w-full h-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                    alt={`Property Image ${index + 1}`}
                    fill
                    className="object-cover rounder-xl rounded-x-xl w-full h-full"
                    sizes="(max-width: 768px) 100vw,"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
        <div className="flex-shrink-0" style={thumbnailStyle}>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            direction={thumbsDirection}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiperShort fix-height-swiper"
            style={{
              height: `${swiperBottomHeight}px`,
              maxWidth: thumbInnerStyle,
              transform:
                thumbsDirection === "horizontal"
                  ? "scaleX(-1)"
                  : "scaleX(-1) scaleY(-1)",
            }}

          >
            {propertyImages
              .map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full h-[80px]"
                  style={{
                    transform:
                      thumbsDirection === "horizontal"
                        ? "scaleX(-1)"
                        : "scaleX(-1) scaleY(-1)",
                  }}
                >
                  <div className="relative w-full h-full cursor-pointer border-2 transition-all">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${image.path}`}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover w-full h-full"
                    />
                  </div>
                </SwiperSlide>
              ))
              .reverse()}
          </Swiper>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 mt-12  ">
        <button
          style={{
            background: 'linear-gradient(90deg, #313881, #0678B4)',
          }}
          onClick={handleCall}
          className="flex items-center text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
        >
          <FaPhoneAlt className="mr-2" />
          Call Now
        </button>
        <PrimaryButton
          onClick={handleWhatsApp}
          style={{
            background: 'linear-gradient(90deg, #313881, #0678B4)',
          }}
          bgColor="bg-green-800"
          hoverColor="hover:bg-green-600"
          icon={FaWhatsapp}
        >
          Book Now
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ImageCarousel;