const init = () => {
  const carouselList = document.querySelectorAll('.carousel');
  carouselList.forEach(carousel => {
    configureCarousel(carousel);
  });
};

const configureCarousel = carousel => {
  const scrollContainer = carousel.firstElementChild;
  const firstChild = scrollContainer.firstElementChild;
  const lastChild = scrollContainer.lastElementChild;
  const firstChildClone = firstChild.cloneNode(true);
  firstChildClone.classList.add('first-child-clone');
  scrollContainer.append(firstChildClone);
  const lastChildClone = lastChild.cloneNode(true);
  lastChildClone.classList.add('last-child-clone');
  scrollContainer.prepend(lastChildClone);
  observeClone(scrollContainer, 'first-child-clone');
  observeClone(scrollContainer, 'last-child-clone');

  setTimeout(() => {
    firstChild.scrollIntoView({
      behavior: 'auto'
    });
  }, 500);

  if (!window.matchMedia('(pointer: coarse)').matches) {
    let autoplay = setInterval(() => {
      scrollContainer.scrollLeft = scrollContainer.scrollBy(
        scrollContainer.clientWidth,
        0,
        { behavior: 'smooth' }
      );
    }, 3000);

    scrollContainer.addEventListener('mouseenter', () => {
      clearInterval(autoplay);
    });

    scrollContainer.addEventListener('mouseout', () => {
      clearInterval(autoplay);
      autoplay = setInterval(() => {
        scrollContainer.scrollBy(scrollContainer.clientWidth, 0, {
          behavior: 'smooth'
        });
      }, 3000);
    });
  }

};

const observeClone = (scrollContainer, position) => {
  const clone = scrollContainer.querySelector('.' + position);
  const lastChildIndex = scrollContainer.children.length - 2;
  const scrollToIndex = position.includes('first') ? 1 : lastChildIndex;
  const observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];
      if (entry.boundingClientRect.x === 0) {
        scrollContainer.scrollLeft = entry.boundingClientRect.width;
        scrollContainer.classList.add('reset');
        scrollContainer.children[scrollToIndex].scrollIntoView({
          behavior: 'auto'
        });
        scrollContainer.classList.remove('reset');
      }
    },
    {
      threshold: [0, 1],
      root: scrollContainer
    }
  );

  observer.observe(clone);
};

const next = element => {
  const nextElement = element.parentElement.nextElementSibling;
  nextElement.scrollIntoView({
    behavior: 'smooth'
  });
};

const previous = element => {
  const nextElement = element.parentElement.previousElementSibling;
  nextElement.scrollIntoView({
    behavior: 'smooth'
  });
};

document.addEventListener('DOMContentLoaded', event => {
  init();
});

document.addEventListener('BeforeUnload', event => {
  console.log(unload);
});
