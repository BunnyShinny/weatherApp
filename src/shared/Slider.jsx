import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function Slider({
  data,
  sliderId,
  cardWidth,
  setCardWidth,
  children,
}) {
  const [sliderIncator, setSliderIncator] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slider, setSlider] = useState(
    document.getElementById(`slider ${sliderId}`)
  );
  const [sliderContainer, setSliderContainer] = useState(
    document.getElementById(`sliderContainer ${sliderId}`)
  );
  const [cards, setCards] = useState(
    document.getElementById(`card ${sliderId}`)
  );
  const [sliderContainerWidth, setSliderContainerWidth] = useState();
  const [cardWidthData, setCardWidthData] = useState();
  let elementToShow =
    window.innerWidth < 1000
      ? window.innerWidth < 600
        ? window.innerWidth < 500
          ? 1
          : 2
        : 3
      : 4;

  if (slider) {
    slider.style.width = data?.length * cardWidthData + "px";
  }

  const nextSlide = () => {
    if (slider) {
      if (
        +slider.style.marginLeft.slice(0, -2) !==
        -cardWidthData * (data?.length - elementToShow)
      ) {
        slider.style.marginLeft =
          +slider.style.marginLeft.slice(0, -2) - cardWidthData + "px";
      }
    }
  };
  const prevSlide = () => {
    if (slider) {
      if (+slider.style.marginLeft.slice(0, -2) !== 0) {
        slider.style.marginLeft =
          +slider.style.marginLeft.slice(0, -2) + cardWidthData + "px";
      }
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  useEffect(() => {
    setSlider(document.getElementById(`slider ${sliderId}`));
    setSliderContainer(document.getElementById(`sliderContainer ${sliderId}`));
    setCards(document.getElementById(`card ${sliderId}`));
    setSliderContainerWidth(sliderContainer?.clientWidth);
    setCardWidthData(sliderContainerWidth / elementToShow);
    if (slider) {
      slider.style.width = data?.length * cardWidthData + "px";
    }
    for (let index = 0; index < data?.length; index++) {
      if (cards) {
        cardWidth[`card ${sliderId}`] = `w-[${cardWidthData}px]`;
        setCardWidth(cardWidth);
      }
    }

    // eslint-disable-next-line
  }, [windowWidth, data,elementToShow,sliderContainerWidth,cardWidthData,cardWidth]);
  // console.log({sliderContainerWidth},{cardWidthData});
  useEffect(() => {
    if (slider) {
      if (slider.style.width.slice(0, -2) < sliderContainerWidth) {
        setSliderIncator(false);
      } else if (slider.style.width.slice(0, -2) > sliderContainerWidth) {
        setSliderIncator(true);
      }
    }
  }, [windowWidth, slider, sliderContainerWidth]);

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
      {sliderIncator && (
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
