// 1. Initialize Icons
lucide.createIcons();

// 2. Initialize AOS (Animate On Scroll)
AOS.init({
    once: true, // Whether animation should happen only once - while scrolling down
    offset: 50, // Offset (in px) from the original trigger point
    duration: 800, // Values from 0 to 3000, with step 50ms
    easing: 'ease-out-cubic', // Default easing for AOS animations
});

// 3. Project Carousel Controls
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('project-track');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (track && scrollLeftBtn && scrollRightBtn) {
        
        // Calculate scroll amount based on card width + gap
        const getScrollAmount = () => {
            const card = track.querySelector('.snap-start');
            if (card) {
                // Gap is around 1.5rem (24px), add it to card width
                return card.offsetWidth + 24; 
            }
            return 400; // Fallback
        };

        scrollLeftBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            track.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    // Optional: Draggable functionality for desktop mouse users
    let isDown = false;
    let startX;
    let scrollLeft;

    if (track) {
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('cursor-grabbing');
            track.classList.remove('cursor-grab');
            track.style.scrollSnapType = 'none'; // Disable snap while dragging
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.classList.remove('cursor-grabbing');
            track.classList.add('cursor-grab');
            track.style.scrollSnapType = 'x mandatory'; // Re-enable snap
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('cursor-grabbing');
            track.classList.add('cursor-grab');
            track.style.scrollSnapType = 'x mandatory'; // Re-enable snap
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            track.scrollLeft = scrollLeft - walk;
        });
    }
});
