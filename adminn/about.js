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





















const imageUrls = [
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto1.png?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto2.png?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto3.jpg?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto4.jpg?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto5.jpg?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto6.jpg?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto7.jpg?raw=true"
  ];

  function preloadImages(urls) {
    const promises = urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    return Promise.all(promises);
  }

  preloadImages(imageUrls).then(() => {
    // Pasang src setelah preload
    document.querySelectorAll('.slide').forEach((img, i) => {
      img.src = imageUrls[i]; // atau: img.setAttribute('src', img.dataset.src);
    });

    // Tampilkan slider setelah gambar siap
    document.querySelector('.slider').style.visibility = 'visible';

    // Mulai slider otomatis
    let currentSlide = 0;
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 3000);
  }).catch(error => {
    console.error("Gagal preload gambar:", error);
  });
