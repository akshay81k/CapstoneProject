var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    loopFillGroupWithBlank: true,
    centerSlide: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
    loopedSlides: 5,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideToClickedSlide: true
});

// Image arrays for each box
const box1Images = [
    './images/banner2.jpeg',
    './images/banner1.jpg',
    './images/banner3.jpg'
];

const box2Images = [
    './images/banner1.jpg',
    './images/banner3.jpg',
    './images/banner2.jpeg'
];

const box3Images = [
    './images/banner3.jpg',
    './images/banner2.jpeg',
    './images/banner1.jpg'
];

let currentIndex = 0;

function rotateImages() {
    // Get the image elements
    const img1 = document.querySelector('#ban2');
    const img2 = document.querySelector('#ban1');
    const img3 = document.querySelector('#ban3');

    // Move images to the left
    img1.style.transform = 'translateX(-100%)';
    img2.style.transform = 'translateX(-100%)';
    img3.style.transform = 'translateX(-100%)';

    setTimeout(() => {
        // Update images
        img1.src = box1Images[currentIndex];
        img2.src = box2Images[currentIndex];
        img3.src = box3Images[currentIndex];

        // Reset position without transition
        img1.style.transition = 'none';
        img2.style.transition = 'none';
        img3.style.transition = 'none';
        img1.style.transform = 'translateX(100%)';
        img2.style.transform = 'translateX(100%)';
        img3.style.transform = 'translateX(100%)';

        // Force reflow
        img1.offsetHeight;
        img2.offsetHeight;
        img3.offsetHeight;

        // Restore transition and move to normal position
        img1.style.transition = 'transform 1s ease';
        img2.style.transition = 'transform 1s ease';
        img3.style.transition = 'transform 1s ease';
        img1.style.transform = 'translateX(0)';
        img2.style.transform = 'translateX(0)';
        img3.style.transform = 'translateX(0)';

        // Update index
        currentIndex = (currentIndex + 1) % box1Images.length;
    }, 1000);
}

// Start the rotation
setInterval(rotateImages, 3000);

// Latest News Carousel functionality
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".ecard").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const scrollAmount = btn.id === "left" ? -firstCardWidth : firstCardWidth;
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);