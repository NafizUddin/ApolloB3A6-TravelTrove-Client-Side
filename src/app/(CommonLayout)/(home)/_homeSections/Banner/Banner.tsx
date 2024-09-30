// Banner.js
import styles from "./BannerAnimation.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      {/* Zoom animation for the background */}
      <div className={styles.animateZoom} />
      <div className={styles.overlay}>
        {/* Your content goes here */}
        <h1 className="text-5xl font-bold text-white">
          Where will you go next?
        </h1>
        <p className="text-lg text-white mt-6 max-w-2xl mx-auto text-center">
          🌍 Welcome to TravelTrove! ✈️ Join a vibrant community of travel
          enthusiasts eager to share their personal stories, exchange tips, and
          connect with fellow adventurers. Dive into a world of travel
          inspiration and discover new destinations through the eyes of those
          who’ve been there. Let’s explore together!
        </p>
      </div>
    </div>
  );
};

export default Banner;
