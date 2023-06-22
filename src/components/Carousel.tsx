import type { NextPage } from "next";
import { Carousel } from "react-responsive-carousel";
import CarouselImage from "#/carousel.png";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent: NextPage = () => {
  return (
    <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
      <div>
        <Image alt="advetisement" src={CarouselImage} priority={true} />
      </div>
      <div>
        <Image alt="advetisement" src={CarouselImage} />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
