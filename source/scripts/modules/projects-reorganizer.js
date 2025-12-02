// let currentMode = null; // 'mobile' или 'notMobile'
// let isProcessing = false;

// const reorganizeProjects = () => {
//   // Защита от повторных вызовов
//   if (isProcessing) return;
//   isProcessing = true;

//   try {
//     // Проверяем media query
//     const mediaQuery = window.matchMedia('(min-width: 768px)');
//     const isNotMobile = mediaQuery.matches;
//     const newMode = isNotMobile ? 'notMobile' : 'mobile';

//     console.log('Media query matches:', isNotMobile, 'New mode:', newMode, 'Current mode:', currentMode);

//     // Если режим не изменился - выходим
//     if (newMode === currentMode) {
//       console.log('Mode unchanged, skipping');
//       isProcessing = false;
//       return;
//     }

//     const categoriesContainer = document.querySelector('.projects__gallery-categories');
//     const notMobileContainer = document.querySelector('.projects__gallery-slider--notmobile');

//     console.log('Containers found:', {
//       categories: !!categoriesContainer,
//       notMobile: !!notMobileContainer
//     });

//     if (isNotMobile) {
//       console.log('Switching to NOT MOBILE mode');

//       // Очищаем предыдущие клоны
//       console.log('Clearing old clones...');
//       notMobileContainer.innerHTML = '';

//       // Находим ВСЕ оригинальные карточки
//       const allSlides = document.querySelectorAll('.projects__gallery-slide');
//       console.log('Found original slides:', allSlides.length);

//       // Клонируем каждую карточку
//       allSlides.forEach((slide, index) => {
//         const clone = slide.cloneNode(true);
//         // Добавляем метку, что это клон (для дебага)
//         clone.dataset.cloneOf = slide.dataset.category + '-' + index;
//         console.log(`Cloning slide ${index}:, slide.dataset.category`);
//         notMobileContainer.appendChild(clone);
//       });

//       console.log('Clones created:', notMobileContainer.children.length);

//       // Управляем видимостью
//       categoriesContainer.hidden = true;
//       notMobileContainer.hidden = false;

//     } else {
//       console.log('Switching to MOBILE mode');

//       // Очищаем клоны
//       console.log('Clearing clones...');
//       notMobileContainer.innerHTML = '';

//       // Оригинальные карточки остаются на своих местах
//       categoriesContainer.hidden = false;
//       notMobileContainer.hidden = true;

//       // Подсчитаем оригинальные карточки
//       const originalSlides = document.querySelectorAll('.projects__gallery-slide');
//       console.log('Original slides in DOM:', originalSlides.length);
//     }

//     // Сохраняем текущий режим
//     currentMode = newMode;
//     console.log('Switch completed. Current mode:', currentMode);

//   } catch (error) {
//     console.error('Error in reorganizeProjects:', error);
//   } finally {
//     isProcessing = false;
//   }
// };

// // Инициализация
// export const initProjectsReorganizer = () => {
//   console.log('Initializing projects reorganizer...');

//   // Запускаем сразу
//   reorganizeProjects();

//   // Слушаем изменения media query
//   const mediaQuery = window.matchMedia('(min-width: 768px)');

//   const handleMediaChange = (e) => {
//     console.log('Media query changed:', e.matches);
//     reorganizeProjects();
//   };

//   mediaQuery.addEventListener('change', handleMediaChange);

//   // Также слушаем ресайз на всякий случай
//   let resizeTimeout;
//   window.addEventListener('resize', () => {
//     clearTimeout(resizeTimeout);
//     resizeTimeout = setTimeout(() => {
//       console.log('Resize timeout triggered');
//       reorganizeProjects();
//     }, 150);
//   });
// };

let currentMode = null;
let isProcessing = false;

const reorganizeProjects = () => {
  if (isProcessing) {
    return;
  }

  isProcessing = true;

  try {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const isNotMobile = mediaQuery.matches;
    const newMode = isNotMobile ? 'notMobile' : 'mobile';

    if (newMode === currentMode) {
      isProcessing = false;
      return;
    }

    const categoriesContainer = document.querySelector('.projects__gallery-categories');
    const notMobileContainer = document.querySelector('.projects__gallery-slider--notmobile');

    if (isNotMobile) {
      notMobileContainer.innerHTML = '';

      const allSlides = document.querySelectorAll('.projects__gallery-slide');

      allSlides.forEach((slide, index) => {
        const clone = slide.cloneNode(true);
        clone.dataset.cloneOf = `${slide.dataset.category}-${+ index}`;
        notMobileContainer.appendChild(clone);
      });

      categoriesContainer.hidden = true;
      notMobileContainer.hidden = false;

    } else {
      notMobileContainer.innerHTML = '';
      categoriesContainer.hidden = false;
      notMobileContainer.hidden = true;
    }

    currentMode = newMode;

  } finally {
    isProcessing = false;
  }
};

export const initProjectsReorganizer = () => {
  reorganizeProjects();

  const mediaQuery = window.matchMedia('(min-width: 768px)');
  const handleMediaChange = () => {
    reorganizeProjects();
  };

  mediaQuery.addEventListener('change', handleMediaChange);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      reorganizeProjects();
    }, 150);
  });
};
