const header = document.querySelector('.header');
const html = document.querySelector('.page');
const burger = header.querySelector('.button-burger');
const menu = header.querySelector('.main-nav__list');

const isMenuOpen = () => menu.classList.contains('main-nav__list--opened');

const closeMenu = () => {
  burger.classList.remove('button-burger--opened');
  burger.classList.add('button-burger--closed');
  menu.classList.remove('main-nav__list--opened');
  html.classList.remove('html-jswork');

  document.removeEventListener('click', handleOutsideClick);
};

const openMenu = () => {
  burger.classList.remove('button-burger--closed');
  burger.classList.add('button-burger--opened');
  menu.classList.add('main-nav__list--opened');
  html.classList.add('html-jswork');

  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 10);
};

const toggleMenu = () => {
  if (isMenuOpen()) {
    closeMenu();
  } else {
    openMenu();
  }
};

function handleOutsideClick(e) {
  if (isMenuOpen() &&
    !e.target.closest('.main-nav__list') &&
    !e.target.closest('.button-burger')) {
    closeMenu();
  }
}

const initMenu = () => {
  burger.addEventListener('click', toggleMenu);
};

export { initMenu };
