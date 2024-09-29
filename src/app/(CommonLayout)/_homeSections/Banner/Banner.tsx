// Banner.js
import styles from "./BannerAnimation.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      {/* Zoom animation for the background */}
      <div className={styles.animateZoom} />
      <div className={styles.overlay}>
        {/* Your content goes here */}
        <h1 className="text-4xl font-bold text-white">
          Welcome to TravelTrove
        </h1>
        <p className="text-lg text-white">Your adventure begins here!</p>
      </div>
    </div>
  );
};

export default Banner;
