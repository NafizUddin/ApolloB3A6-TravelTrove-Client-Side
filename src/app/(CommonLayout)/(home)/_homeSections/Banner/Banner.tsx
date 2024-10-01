import styles from "./BannerAnimation.module.css";
import TravelAnimation from "@/src/components/modules/home/TravelAnimation";

const Banner = () => {
  return (
    <div className={styles.banner}>
      {/* Zoom animation for the background */}
      <div className={styles.animateZoom} />
      <div className={styles.overlay}>
        {/* Your content goes here */}
        <div className="flex items-center flex-col lg:flex-row">
          <div className="flex-1 lg:pl-16">
            <h1 className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-white text-center lg:text-left">
              Where will you go next?
            </h1>
            <p className="lg:text-lg text-white mt-6 mx-auto w-4/5 lg:w-auto text-center lg:text-left">
              🌍 Welcome to TravelTrove! ✈️ Join a vibrant community of travel
              enthusiasts eager to share their personal stories, exchange tips,
              and connect with fellow adventurers. Dive into a world of travel
              inspiration and discover new destinations through the eyes of
              those who’ve been there. Let’s explore together!
            </p>
          </div>
          <div className="flex-1">
            <div className="lg:flex justify-center items-center hidden">
              <TravelAnimation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
