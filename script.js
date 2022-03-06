'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//-----------------Implementing Smooth---------------////

// const btnScrollto = document.querySelector('.btn--scroll-to');
// const section1 = document.getElementById('section--1');
// btnScrollto.addEventListener('click', e => {
//   section1.scrollIntoView({
//     behavior: 'smooth',
// });
// });
// btnScrollto.addEventListener('click', function (e) {
//   e.preventDefault();
//   e.target;
//   console.log(e.button);
//   console.log(e);
//   // console.log('e.target: ', e.target.getBoundingClientRect());
//   const section1coords = section1.getBoundingClientRect();
//   // console.log('section1coords: ', section1coords);
//   // console.log(scrollX, scrollY);
//   window.scrollTo({
//     left: section1coords.left + scrollX,
//     top: section1coords.top + scrollY,
//     behavior: 'smooth',
//   });
// });
// console.log(
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});
const links = document.querySelector('.nav__links');
links.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target;
  if (clicked.classList.contains('nav__link')) {
    const neededSection = clicked.getAttribute('href');
    document.querySelector(`${neededSection}`).scrollIntoView({
      behavior: 'smooth',
    });
  } else return;
});

const heading1Func = () => {
  alert('Bismillahr Rohmanir Rohiym');
  heading1.removeEventListener('mouseenter', heading1Func);
};

const randomNumber = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
};

const randomColor = () => {
  return `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;
};

//--------------OPERATIONS TAB CLICK----------------///

const opTabContainer = document.querySelector('.operations__tab-container');
const opDataContentArr = document.querySelectorAll('.operations__content');

opTabContainer.addEventListener('click', function (e) {
  const tabClicked = e.target.closest('.operations__tab');
  const neededNum = tabClicked.dataset.tab;

  if (!tabClicked) return;
  opTabContainer
    .querySelectorAll('.operations__tab')
    .forEach(eachOne => eachOne.classList.remove('operations__tab--active'));
  tabClicked.classList.add('operations__tab--active');
  opDataContentArr.forEach(eachOne => {
    eachOne.classList.remove('operations__content--active');
    if (eachOne.classList.contains(`operations__content--${neededNum}`)) {
      eachOne.classList.add('operations__content--active');
    }
  });
});
const ab = document.querySelector('.nav');
console.log('ab: ', ab);
const navHeight = getComputedStyle(ab).height;
//------------NAV BAR HOVER EFFECT-------------///

const navParent = document.querySelector('.nav');
//-------HOVER FUNCTION----------//////
const navHoverFn = function (e, opacity) {
  const hoveredBtn = e.target.closest('.nav__link');
  if (!hoveredBtn) return;
  const siblingsArr = hoveredBtn.closest('.nav').querySelectorAll('.nav__link');
  const logo = hoveredBtn.closest('.nav').querySelector('img');

  siblingsArr.forEach(eachOne => {
    if (eachOne !== hoveredBtn) {
      eachOne.style.opacity = this;
      logo.style.opacity = this;
    }
  });
};

//-------MOUSEOVER---------//
navParent.addEventListener('mouseover', navHoverFn.bind(0.5));
//-------MOUSEOUT---------//
navParent.addEventListener('mouseout', navHoverFn.bind(1));

///-------------STICKY NAV ---------------------////
// const section1Coords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (scrollY > section1Coords.top) {
//     document.querySelector('.nav').classList.add('sticky');
//   } else document.querySelector('.nav').classList.remove('sticky');
// });

////--------BETTER WAY,INTERSECTION OBSERVER----------///

// const obOptions = {
//   root: null,
//   threshold: [0.1],
// };
// const obCallBkFn = function (entries, observer) {
//   const [entry] = entries;
//   console.log('entry: ', entry);
// };

// const observer = new IntersectionObserver(obCallBkFn, obOptions); // this is an object

// observer.observe(section1); // This is a method that observes section1

const header = document.querySelector('header');
const obOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}`,
};
const stickyNavFn = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    document.querySelector('.nav').classList.add('sticky');
  } else document.querySelector('.nav').classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNavFn, obOptions);
headerObserver.observe(header);

///----- SECTIONS COME-OUT--------////

const sectionAll = document.querySelectorAll('.section');

const secJumFn = function (entries, obserer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const secObOptions = {
  root: null,
  threshold: 0.15,
};
const observer = new IntersectionObserver(secJumFn, secObOptions);
sectionAll.forEach(eachOne => {
  observer.observe(eachOne);
});

///--------------LAZY LOADING----------///

const imgTargets = document.querySelectorAll(`img[data-src]`);

const imgObOptions = {
  root: null,
  threshold: 0,
};
const imgLoadFn = (entries, oserver) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.getAttribute(`data-src`);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(imgLoadFn, imgObOptions);
imgTargets.forEach(eachOne => imgObserver.observe(eachOne));

///--------------CARUSEL SLIDE|| SLDER COMPONENT----------///
const sliderFn = () => {
  const slider = document.querySelector('.slider'); // PARENT ELEMENT

  const slides = slider.querySelectorAll('.slide');

  const btnRight = slider.querySelector('.slider__btn--right');

  const btnLeft = slider.querySelector('.slider__btn--left');
  const goToSlide = function (slide) {
    slides.forEach((eachSlide, index) => {
      eachSlide.style.transform = `translateX(${(index - slide) * 100}%)`;
    });
  };
  goToSlide(0);
  const nextSlide = function () {
    currentSlide++;
    if (currentSlide === slides.length) currentSlide = 0;
    goToSlide(currentSlide);
    dotsActiveFn(currentSlide);
  };
  const previousSlide = function () {
    if (currentSlide < 0) currentSlide = slides.length - 1;
    goToSlide(currentSlide);
    dotsActiveFn(currentSlide);
    currentSlide--;
  };
  let currentSlide = 0;

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && previousSlide();
  });
  //===================--DOTS-ACTIVE-FN--==============

  //-------CREATING DOTS--------///
  const dotsContainer = document.querySelector('.dots');

  dotsContainer.textContent = '';
  slides.forEach(function (_, index) {
    const html = `<button class="dots__dot" data-slide="${index}"></button>`;
    dotsContainer.insertAdjacentHTML('beforeend', html);
  });
  dotsContainer.addEventListener('click', function (e) {
    const btnClicked = e.target.closest('.dots__dot');
    if (!btnClicked) return;

    goToSlide(btnClicked.dataset.slide);
    dotsActiveFn(btnClicked.dataset.slide);
  });
  function dotsActiveFn(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(eachOne => eachOne.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }
  dotsActiveFn(0);
};
sliderFn();
