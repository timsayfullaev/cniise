const swiperServices = new Swiper(".services__slider", {
  navigation: {
    nextEl: ".services__arrow_next",
    prevEl: ".services__arrow_prev",
  },
  slidesPerView: 1,
  spaceBetween: 12,
  grabCursor: true,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

const swiperResults = new Swiper(".results__slider", {
  navigation: {
    nextEl: ".results__arrow_next",
    prevEl: ".results__arrow_prev",
  },
  slidesPerView: "auto",
  spaceBetween: 12,
  grabCursor: true,
});

const swiperReviews = new Swiper(".reviews__slider", {
  navigation: {
    nextEl: ".reviews__arrow_next",
    prevEl: ".reviews__arrow_prev",
  },
  slidesPerView: 1,
  spaceBetween: 12,
  grabCursor: true,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

MicroModal.init({
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
});

const btn = document.querySelector(".header__search-button");
const search = document.querySelector(".header__search");

btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  search.classList.toggle("active");
});

const mobileBtn = document.querySelector(".header__menu-button");
const mobileNav = document.querySelector(".header__mobile");

mobileBtn.addEventListener("click", () => {
  mobileBtn.classList.toggle("active");
  mobileNav.classList.toggle("active");
});

const input = document.querySelector(".file__input");
const list = document.querySelector(".file__list");

let filesArr = [];

input.addEventListener("change", () => {
  filesArr = [...filesArr, ...input.files];
  render();
});

function render() {
  list.innerHTML = "";

  if (filesArr.length === 0) {
    list.classList.remove("active");
    return;
  }

  list.classList.add("active");

  filesArr.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "file__item";

    item.innerHTML = `
      <span class="file__name">${file.name}</span>
      <span class="file__remove" data-index="${index}"><i class="icon-close"></i></span>
    `;

    list.appendChild(item);
  });
}

list.addEventListener("click", (e) => {
  const btn = e.target.closest(".file__remove");

  if (!btn) return;

  const i = btn.dataset.index;
  filesArr.splice(i, 1);
  render();
});

document.querySelectorAll(".results__item-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".results__item");
    const text = btn.querySelector("span");

    if (!item || !text) return;

    item.classList.toggle("active");

    text.textContent = item.classList.contains("active")
      ? "Свернуть"
      : "Развернуть";
  });
});

document.querySelectorAll(".reviews__item-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".reviews__item");
    const content = item.querySelector(".reviews__item-more");
    const text = btn.querySelector("span");

    if (!item || !content || !text) return;

    const isOpen = item.classList.contains("active");

    if (isOpen) {
      // закрываем
      content.style.maxHeight = null;
      item.classList.remove("active");
      text.textContent = "Развернуть отзыв";
    } else {
      // открываем
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      text.textContent = "Свернуть отзыв";
    }
  });
});

const items = document.querySelectorAll(".accordion__item");

items.forEach((item) => {
  const header = item.querySelector(".accordion__header");
  const content = item.querySelector(".accordion__content");

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    // закрываем все
    items.forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".accordion__content").style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

document.querySelectorAll(".accordion__list").forEach((list) => {
  const items = list.querySelectorAll(".accordion__list-item");
  const limit = parseInt(list.dataset.limit) || 5;
  const button = list.nextElementSibling;

  // если элементов меньше лимита → кнопку скрываем
  if (items.length <= limit) {
    if (button) button.style.display = "none";
    return;
  }

  // скрываем лишние
  items.forEach((item, index) => {
    if (index >= limit) {
      item.classList.add("hidden");
    }
  });

  let expanded = false;

  button.addEventListener("click", () => {
    expanded = !expanded;

    items.forEach((item, index) => {
      if (index >= limit) {
        item.classList.toggle("hidden", !expanded);
      }
    });

    button.textContent = expanded ? "Скрыть" : "Показать ещё";

    const accordionContent = list.closest(".accordion__content");
    accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
  });
});
