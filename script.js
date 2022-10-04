'use strict';

//////////////////////////////////////////////////////
//////////       ELEMENT SELECTION      //////////////
//////////////////////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const operations = document.querySelector('.operations');
const nav = document.querySelector('.nav');
//////////////////////////////////////////////////////
///////////////       MODAL WINDOW      //////////////
//////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////
///////////////       SCROLLING      /////////////////
//////////////////////////////////////////////////////
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // //getting coordinate information
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y): ', window.scrollX, window.scrollY);
  // //height and width of viewport
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
});

//////////////////////////////////////////////////////
////////////       TABBED COMPONENT      /////////////
//////////////////////////////////////////////////////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return; //guard clause ako nije kliknuto na dugme odmah return i prekida se operacij - ne desava se nista. Ako je kliknuto na dugme, nastavlja se izvrsavanje koda
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activating content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////
////////////     MENU FADE ANIMATION     /////////////
//////////////////////////////////////////////////////
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////////
////////////      STICKY NAVIGATION      /////////////
//////////////////////////////////////////////////////
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
//////////////////////////////////////////////////////
////////////           SLIDER            /////////////
//////////////////////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// REFERENCE CLASSES
//SCROLLING
// window.scrollTo(s1coords.left, s1coords.top + window.scrollY);
// uvek uzeti u obzir trenutnu scroll poziciju, odnosno dodati je na .top poziciju da bi uvek bio isti rezultat skrolovanja sa bilo koje trenutne pozicije

//SCROLLING SMOOTH
// window.scrollTo({
//   left: s1coords.left + window.scrollX,
//   top: s1coords.top + window.scrollY,
//   behavior: 'smooth',
// });

//section1.scrollIntoView({ behavior: 'smooth' }); //MODERNI NACIN, ako ne rade na starom browseru, koristiti prethodni nacin

//////////////////////////////////////////////////////
//////////       PAGE NAVIGATION       ///////////////
//////////////////////////////////////////////////////
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//////////////////////////////////////////////////////
// KREIRANJE I BRISANJE HTML ELEMENATA
// creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for imporved functionality and analytics';
message.innerHTML =
  'We use cookies for imporved functionality and analytics. <button class="btn btn--close-cookie">Got it</buitton>';

// UBACIVANJE pre i posle header-a, kao child element header-a
header.append(message);
// header.append(message);
// header.append(message.cloneNode(true));

// UBACIVANJE pre i posle header-a, u istom nivou (SIBLINGS)
// header.before(message);
// header.after(message);

// DELETE elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// STYLES ATTRIBUTES AND CLASSES
// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '100%';

// console.log(message.style.height); //ne prikazuje nista
// console.log(getComputedStyle(message).color); //prikazuje vrednost iz stylesheet-a
// console.log(getComputedStyle(message).height);

// CHANGING style - uzivo, getcomputedsyle vraca STRING kao rezultat (50px), a da bi se njegova vrednost menjala, mora se dodati parseFloat, u decimalnom sistemu
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// CHANGING root properties of stylesheet
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.className);

// //Non-standard attributes (custom atributes)
// console.log(logo.designer); // returns undefined, custom atribute
// console.log(logo.getAttribute('designer')); //retunrs right attribute

// //Attributes can be set through JS
// logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt);
// logo.setAttribute('company', 'bankist'); //non-standard attributes

// // data attributes (data-*)
// console.log(logo.dataset.versionNumber); // u html pise data-version-number, ali se ovde pretvara u camelCase, sta god da pise iza data-*

// // CLASSES
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');
// logo.className = 'ime nove klase'; // ne koristiti jer brise sve postojece klase elementa

// //EVENTS

// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   // alert('addEventListener: Great! You are reading the heading');
// });
// h1.onmouseenter = function (e) {
//   // alert('addEventListener: Great! You are reading the heading');
// };

// // EVENT PROPAGATION

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(0, 255);
//   console.log('LINK', e.target, e.currentTarget);

//   // STOP EVENT PROPAGATION
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(0, 255);
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(0, 255);
//   console.log('NAV', e.target, e.currentTarget);
// });

// // DOM TRAVERSING
// //const h1 = document.querySelector('h1'); //alredy selected

// // Going downwards
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';

// //going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// // closest find closest parent to the element passed into function .header in this case, so closest heaeder to selected h1 element

// // going sideways (siblings)
// // only direct siblings can be selected
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// // if all siblings are neded, there is a trick
// console.log(h1.parentElement.children); //includes h1
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });

// // INTERSECTION OBSERVER API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOpitions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOpitions);
// observer.observe(section1);

// const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// REVEAL SECTIONS
const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
