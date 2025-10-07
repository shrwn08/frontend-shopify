import React, { useEffect, useState } from "react";
import Hero1 from "../assets/image/Hero_1.jpg";
import Hero2 from "../assets/image/Hero_2.jpg";
import Hero3 from "../assets/image/Hero_3.jpg";
import Hero4 from "../assets/image/Hero_4.jpg";

const hero_images = [Hero1, Hero2, Hero3, Hero4];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hero_images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
<section className="w-full relative overflow-hidden">
  {/* Slider Container */}
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {hero_images.map((image, idx) => (
      <div
        key={idx}
        className="w-full flex-shrink-0 relative"
        style={{ paddingTop: "56.25%" }} // 16:9 aspect ratio for responsiveness
      >
        <img
          loading="lazy"
          src={image}
          alt={`Hero ${idx + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    ))}
  </div>

  {/* Navigation Dots */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
    {hero_images.map((_, idx) => (
      <div
        key={idx}
        onClick={() => setCurrentIndex(idx)}
        className={`cursor-pointer h-3 w-3 rounded-full transition-all duration-300 ${
          currentIndex === idx ? "bg-white scale-125" : "bg-gray-400"
        }`}
      ></div>
    ))}
  </div>
</section>


  );
};

export default Hero;
