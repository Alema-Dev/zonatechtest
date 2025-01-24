document.addEventListener("DOMContentLoaded", () => {

  //Selección de elementos del DOM
  const toggleButton = document.querySelector(".navbar__toogle-btn");
  const mobileMenu = document.querySelector(".navbar__mobile-menu");

  const toggleMenu = () => {
    mobileMenu.style.display = mobileMenu.style.display == "none" || mobileMenu.style.display == ""
    ? "flex"
    : "none";
  };

  const hideMenu = () => {
    mobileMenu.style.display = "none";
  }

  toggleButton.addEventListener("click", toggleMenu);
  window.addEventListener("resize", hideMenu);
  window.addEventListener("load", hideMenu);  
})

const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");

const updateIndicator = (tab, index) => {
  sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
  sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

  const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
  sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth"});
}


  //Inicializa instancia de swiper
const swiper = new Swiper(".slider-container", {
  effect: "effect-creative",
  speed: 800,
  autoplay: { delay: 4000 },
  navigation:{
    prevEl: "#slide-prev",
    nextEl: "#slide-next"
  },

  on: {
    slideChange: () => {
      const currentTabindex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
      updateIndicator(sliderTabs[swiper.activeIndex], currentTabindex);
    },
    reachEnd: () => swiper.autoplay.stop()
  }
});

sliderTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    swiper.slideTo(index);
    updateIndicator(tab, index);
  })
});

updateIndicator(sliderTabs[0], 0);
window.addEventListener("resize", () =>updateIndicator(sliderTabs[swiper.activeIndex], 0));


  
