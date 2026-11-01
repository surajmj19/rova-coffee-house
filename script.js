// ======================================================================
// Element
// ======================================================================
const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".nav-link");
const toggleNav = document.getElementById("toggle-nav");
const toggleNavIcon = toggleNav.querySelector("i");
const sections = document.querySelectorAll("section");
const orderBtns = document.querySelectorAll(".order-btn");
const filterBtns = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll("article.card");
const menuGrid = document.querySelector(".menu-grid");

// ======================================================================
// Functions
// ======================================================================
const isMenuOpen = () => header.classList.contains("is-open");
const setMenu = (open) => {
  header.classList.toggle("is-open", open);
  document.body.classList.toggle("no-scroll", open);
  toggleNav.setAttribute("aria-expanded", open);
  toggleNav.setAttribute(
    "aria-label",
    open ? "Close Navigation" : "Open Navigation",
  );

  toggleNavIcon.classList.toggle("ri-menu-line", !open);
  toggleNavIcon.classList.toggle("ri-close-large-line", open);
};

const setCurrent = (hash) => {
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("is-current");
      link.removeAttribute("aria-current");
    }
  });
};

const placeOrder = (itemText) => {
  const msg = `Hi ROVA! I'd like to ${itemText}.`;
  const encodedMsg = encodeURIComponent(msg);
  const phone = "15550143";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

  window.open(whatsappUrl, "_blank");
};

const filterMenu = (category) => {
  menuGrid.innerHTML = "";
  if (category === "all") {
    menuCards.forEach((data) => {
      menuGrid.appendChild(data);
    });
  } else {
    const filteredCards = Array.from(menuCards).filter(
      (card) => card.getAttribute("data-category") === category,
    );

    filteredCards.forEach((data) => {
      menuGrid.appendChild(data);
    });
  }
};

const setFilterBtn = (filter) => {
  filterBtns.forEach((btn) => {
    if (btn.getAttribute("data-filter") === filter) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });

  filterMenu(filter);
};

// ======================================================================
// Listeners
// ======================================================================

toggleNav.addEventListener("click", () => {
  setMenu(!isMenuOpen());
});

document.addEventListener("click", (event) => {
  const element = event.target.closest(".nav-link");

  if (!element) return;
  setCurrent(element.getAttribute("href"));
  setMenu(false);
});

document.addEventListener("click", (event) => {
  const element = event.target.closest(".order-btn");

  if (!element) return;
  event.preventDefault();
  placeOrder(element.getAttribute("aria-label"));
});

document.addEventListener("click", (event) => {
  const element = event.target.closest(".filter-btn");

  if (!element) return;

  setFilterBtn(element.getAttribute("data-filter"));
});
// ======================================================================
// Observer
// ======================================================================

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId) {
          setCurrent(`#${sectionId}`);
        }
      }
    });
  },
  {
    scrollMargin: `0px 0px 0px 0px`,
    threshold: 0.7,
  },
);

const observer2 = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-current", entry.isIntersecting);
    });
  },
  {
    rootMargin: `0px 0px -100px 0px`,
    threshold: 0.15,
  },
);

sections.forEach((element) => {
  observer.observe(element);
});

sections.forEach((element) => {
  observer2.observe(element);
});
