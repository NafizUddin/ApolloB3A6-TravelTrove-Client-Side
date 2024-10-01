"use client";
import travelAnimation from "@/src/assets/travel.json";
import Lottie from "lottie-react";

const TravelAnimation = () => {
  return (
    <div className="md:max-w-[250px] lg:max-w-[320px] xl:max-w-[350px]">
      <Lottie animationData={travelAnimation} loop={true} />
    </div>
  );
};

export default TravelAnimation;
