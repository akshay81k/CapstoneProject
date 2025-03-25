var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: false,
    fade: true,
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
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 25,
        }
    }
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

    // Add fade-out class
    img1.classList.add('fade-out');
    img2.classList.add('fade-out');
    img3.classList.add('fade-out');

    // Wait for fade out to complete
    setTimeout(() => {
        // Update images
        img1.src = box1Images[currentIndex];
        img2.src = box2Images[currentIndex];
        img3.src = box3Images[currentIndex];

        // Remove fade-out and add fade-in
        img1.classList.remove('fade-out');
        img2.classList.remove('fade-out');
        img3.classList.remove('fade-out');
        img1.classList.add('fade-in');
        img2.classList.add('fade-in');
        img3.classList.add('fade-in');

        // Update index
        currentIndex = (currentIndex + 1) % box1Images.length;

        // Remove fade-in class after animation completes
        setTimeout(() => {
            img1.classList.remove('fade-in');
            img2.classList.remove('fade-in');
            img3.classList.remove('fade-in');
        }, 2000);
    }, 2000);
}

// Increase interval between rotations
setInterval(rotateImages, 8000);

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

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

hamburger.addEventListener('click', () => {
    // Toggle hamburger menu
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Handle dropdowns in mobile menu
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});

// Close menu when clicking a link
const navbarLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navbarLinks.classList.remove('active');
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navbarLinks.classList.remove('active');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});