document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk toggle konten timeline
    function setupTimeline(headerSelector, contentSelector) {
        const header = document.querySelector(headerSelector);
        const content = document.querySelector(contentSelector);
        
        if (!header || !content) return;
        
        header.addEventListener('click', function() {
            // Jika konten sedang ditampilkan
            if (content.style.display === 'block') {
                content.style.animation = 'slideUp 0.5s ease forwards';
                
                // Setelah animasi selesai, sembunyikan elemen
                setTimeout(() => {
                    content.style.display = 'none';
                }, 500);
            } 
            // Jika konten tersembunyi
            else {
                content.style.display = 'block';
                content.style.animation = 'slideDown 0.5s ease forwards';
            }
        });
    }
    
    // Setup untuk kedua timeline
    setupTimeline('.timeline-header1', '.kontenTimeline1');
    setupTimeline('.timeline-header2', '.kontenTimeline2');
    setupTimeline('.timeline-header3', '.kontenTimeline3');
    setupTimeline('.timeline-header4', '.kontenTimeline4');
    setupTimeline('.timeline-header5', '.kontenTimeline5');
});










let currentSlide = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  slides.style.transform = `translate3d(-${currentSlide * 100}%, 0, 0)`;
}, 3000); // Ganti slide setiap 3 detik
