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






















document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".slides");
    const slideImages = document.querySelectorAll(".slide");
    const totalSlides = slideImages.length;
    let currentSlide = 0;
    let slideshowInterval = null;
  
    // Fungsi untuk memeriksa apakah gambar sudah sepenuhnya dirender
    function checkImageComplete(img) {
      return img.complete && img.naturalHeight !== 0;
    }
  
    // Fungsi tunggu semua gambar dimuat dan dirender
    function preloadImages(images, callback) {
      let loadedCount = 0;
      let allImagesLoaded = false;
  
      function imageLoaded() {
        if (allImagesLoaded) return;
        
        loadedCount++;
        if (loadedCount === images.length) {
          allImagesLoaded = true;
          callback();
        }
      }
  
      images.forEach((img) => {
        // Jika gambar sudah dimuat
        if (checkImageComplete(img)) {
          loadedCount++;
          if (loadedCount === images.length) {
            allImagesLoaded = true;
            callback();
          }
          return;
        }
  
        // Tambahkan event listener untuk gambar yang belum dimuat
        img.addEventListener('load', imageLoaded);
        img.addEventListener('error', imageLoaded); // Tangani error juga
      });
  
      // Periksa lagi jika semua gambar sudah dimuat sebelum event listener terpasang
      if (Array.from(images).every(checkImageComplete)) {
        allImagesLoaded = true;
        callback();
      }
    }
  
    // Fungsi untuk memulai slideshow
    function startSlideshow() {
      console.log("Semua gambar telah siap, mulai slider...");
      slideshowInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        slidesContainer.style.transform = `translate3d(-${currentSlide * 100}%, 0, 0)`;
      }, 3000);
    }
  
    // Panggil preload, lalu jalankan slider
    preloadImages(slideImages, startSlideshow);
  
    // Bersihkan interval saat halaman ditutup/unload
    window.addEventListener('beforeunload', () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    });
  });
