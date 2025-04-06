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





















// Daftar URL gambar untuk preload
const imageUrls = [
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/%7B1E3F8480-0C89-4741-AEF4-1356B54F7D39%7D%20(1).png?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/%7B34898D06-AF6F-4AE7-91BF-202C380AC2A4%7D%20(1).png?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/WhatsApp%20Image%202023-11-08%20at%2013.32.00_8b0ec696%20(1).jpg?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/WhatsApp%20Image%202023-11-24%20at%2016.01.30_e23aecd0.jpg?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/WhatsApp%20Image%202024-01-16%20at%2020.43.57_44d2d3f7.jpg?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/WhatsApp%20Image%202024-07-16%20at%2020.31.45_8e48189e.jpg?raw=true",
    "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/WhatsApp%20Image%202024-07-24%20at%2009.16.08_a4a5f833.jpg?raw=true"
  ];

  // Fungsi untuk preload gambar
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

  // Inisialisasi slider
  let currentSlide = 0;
  const slides = document.querySelector(".slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  // Mulai animasi setelah semua gambar dimuat
  preloadImages(imageUrls).then(() => {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      slides.style.transform = `translate3d(-${currentSlide * 100}%, 0, 0)`;
    }, 3000); // Ganti slide setiap 3 detik
  }).catch(error => {
    console.error("Gagal memuat gambar:", error);
  });
