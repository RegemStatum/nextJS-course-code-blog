import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/nicolaus-copernicus.jpeg"
          alt="An image showing Aleksandr"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Aleksandr</h1>
      <p>
        The blog is about React, NextJS and more. Feel comfortable and be ready
        to read high quality content
      </p>
    </section>
  );
};

export default Hero;
