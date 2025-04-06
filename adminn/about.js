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





















const slideData = [
    {
      src: "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto1.png?raw=true",
      caption: "Pneumatic JTE PNC, Cilacap"
    },
    {
      src: "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto2.png?raw=true",
      caption: "GKB PNC, Cilacap"
    },
    {
      src: "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto3.jpg?raw=true",
      caption: "Instalasi JTE PNC, Cilacap"
    },
    {
      src: "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto4.jpg?raw=true",
      caption: "GKB PNC, Cilacap"
    },
    {
      src: "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto5.jpg?raw=true",
      caption: "Makrab JTE, Purbalingga"
    },
    {
      src: "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto6.jpg?raw=true",
      caption: "JTE PNC, Cilacap"
    },
    {
      src: "https://github.com/Tangguh80/portofolioo/blob/main/adminn/image/foto7.jpg?raw=true",
      caption: "Studi Ekskursi, Surabaya"
    }
  ];
  
  const slide1 = document.getElementById("slide1");
  const slide2 = document.getElementById("slide2");
  const captionElement = document.getElementById("active-caption");
  
  let currentSlide = 0;
  let showingFirst = true;
  
  function showSlide(index) {
    const { src, caption } = slideData[index];
    const nextImg = showingFirst ? slide2 : slide1;
    const currentImg = showingFirst ? slide1 : slide2;
  
    // Sembunyikan dulu nextImg
    nextImg.classList.remove("active");
  
    // Load gambar baru
    nextImg.onload = () => {
      // Setelah gambar selesai dimuat, baru fade-in
      nextImg.classList.add("active");
      captionElement.textContent = caption;
    };
  
    nextImg.src = src;
  
    // Pastikan current img disembunyikan
    currentImg.classList.remove("active");
  
    showingFirst = !showingFirst;
  }
  
  // Inisialisasi pertama
  showSlide(currentSlide);
  
  // Ganti slide tiap 3 detik
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slideData.length;
    showSlide(currentSlide);
  }, 3000);
  
  
  
