import { useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function Slider({
  data,
  sliderId,
  cardWidthData,
  setCardWidth,
  children,
}) {
  let slider = document.getElementById(`slider ${sliderId}`);
  let sliderContainer = document.getElementById(`sliderContainer ${sliderId}`);
  let cards = document.getElementById(`card ${sliderId}`);
  let elementToShow = window.innerWidth > 600 ? 5 : 1;
  
  let sliderContainerWidth = sliderContainer?.clientWidth;
  let cardWidth = sliderContainerWidth / elementToShow;

  if (slider) {
    slider.style.width = data?.length * cardWidth + "px";
  }

  const nextSlide = () => {
    if (
      +slider.style.marginLeft.slice(0, -2) !==
      -cardWidth * (data?.length - elementToShow)
    ) {
      slider.style.marginLeft =
        +slider.style.marginLeft.slice(0, -2) - cardWidth + "px";
    }

  };
  const prevSlide = () => {
    if (+slider.style.marginLeft.slice(0, -2) !== 0) {
      slider.style.marginLeft =
        +slider.style.marginLeft.slice(0, -2) + cardWidth + "px";
    }
  };
  useEffect(() => {
    cardWidth = sliderContainerWidth / elementToShow;
    if (slider) {
      slider.style.width = data?.length * cardWidth + "px";
    }
    for (let index = 0; index < data?.length; index++) {
      const element = data[index];
      if (cards) {
        // cards.style.width = cardWidth + "px";
        // element.width = cardWidth + "px";
        cardWidthData[`card ${sliderId}`] = `w-[${cardWidth}px]`;

        setCardWidth(cardWidthData);
      }
    }
  }, [sliderContainer?.clientWidth]);
  return (
    <div
      id={`sliderContainer ${sliderId}`}
      className="border-l-2 border-r-2 border-gray-500 w-full h-full m-auto pt-0 px-0 relative group overflow-hidden"
    >
      <div
        id={`slider ${sliderId}`}
        className={`flex-none flex h-full px-0 no-scrollbar overflow-x-auto transition-margin duration-700`}
      >
        {children}
      </div>
      {slider?.style.width.slice(0, -2)>sliderContainerWidth && (
        <div className="hidden group-hover:block">
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-0 text-2xl rounded-full bg-black/20 text-gray-300 cursor-pointer p-2">
        <BsChevronCompactLeft onClick={prevSlide} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-0 text-2xl rounded-full bg-black/20 text-gray-300 cursor-pointer p-2">
        <BsChevronCompactRight onClick={nextSlide} />
      </div>
      </div>
      )}
    </div>
  );
}
