import { initBannersSlider } from './banners/banners-slider.js';
import { initScrollListener } from './smooth-scroll.js';

const initTransform = () => {
  const slider = initBannersSlider();
  const observer = initScrollListener();

  if (slider) {
    const originalGoToSlide = slider.goToSlide;

    slider.goToSlide = function (index) {
      const newSlide = originalGoToSlide.call(this, index);

      if (newSlide && index !== 0) {
        observer.disconnect();
      }

      return newSlide;
    };
  }

  return { slider };
};

export { initTransform };
