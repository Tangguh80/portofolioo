/*====================================== Navigasi Navbar utama ====================================*/
document.addEventListener("DOMContentLoaded", function() {
    // Daftar section yang valid
    const validSections = ['work', 'about', 'skill', 'certificate'];
    
    // Get all elements
    const navLinks = document.querySelectorAll("nav ul li");
    const activeBg = document.querySelector(".active-bg");
    const contentContainers = {
        work: document.querySelector(".Work"),
        about: document.querySelector(".About"),
        skill: document.querySelector(".Skiil"),
        certificate: document.querySelector(".certificate")
    };

    // Sembunyikan active-bg sepenuhnya selama loading
    activeBg.style.display = "none";
    activeBg.style.opacity = "0";
    activeBg.style.width = "0";

    // Hide all containers immediately (except Work)
    Object.keys(contentContainers).forEach(key => {
        if (contentContainers[key]) {
            contentContainers[key].style.display = key === 'work' ? 'block' : 'none';
        }
    });

    // Fungsi untuk scroll langsung ke atas tanpa animasi
    function scrollToTopInstant() {
        window.scrollTo(0, 0);
    }

    // Fungsi untuk mengupdate URL dan title
    function updateUrlAndTitle(section) {
        const baseTitle = "Tangguh Sarwono • ";
        let newTitle = baseTitle;
        
        switch(section.toLowerCase()) {
            case 'work':
                newTitle += "Engineer";
                break;
            case 'about':
                newTitle += "About";
                break;
            case 'skill':
                newTitle += "Skill";
                break;
            case 'certificate':
                newTitle += "certificate";
                break;
            default:
                newTitle += "Engineer";
        }
        
        document.title = newTitle;
        
        const currentParams = new URLSearchParams(window.location.search);
        const chatParam = currentParams.get('chat');
        
        let newUrl = window.location.pathname;
        let params = [];
        
        if (section.toLowerCase() !== 'work') {
            params.push(`section=${section}`);
        }
        
        if (chatParam === 'open') {
            params.push('chat=open');
        }
        
        if (params.length > 0) {
            newUrl += '?' + params.join('&');
        }
        
        history.replaceState({ section }, '', newUrl);
    }

    // Fungsi untuk memvalidasi dan membersihkan section dari URL
    function getValidSectionFromUrl() {
        const params = new URLSearchParams(window.location.search);
        let section = params.get('section');
        
        if (!section) return 'work';
        
        section = section.toLowerCase().trim();
        
        for (const validSection of validSections) {
            if (section.startsWith(validSection)) {
                return validSection;
            }
        }
        
        return 'work';
    }


    // Function to update active content
    function updateContentDisplay(activeClass) {
        Object.values(contentContainers).forEach(container => {
            if (container) container.style.display = 'none';
        });
        
        const activeKey = activeClass.toLowerCase();
        const activeContainer = contentContainers[activeKey];
        
        if (activeContainer) {
            activeContainer.style.display = 'block';
            scrollToTopInstant();
        }
        
        updateUrlAndTitle(activeClass);
    }







    // Function to move active background
    function moveActiveBg(target, animate = true) {
        if (!target) return;

        // Aktifkan display sebelum memposisikan
        activeBg.style.display = "block";
        
        if (!animate) {
            activeBg.style.transition = 'none';
        }

        requestAnimationFrame(() => {
            setTimeout(() => {
                const width = target.offsetWidth;
                const left = target.offsetLeft;
                
                activeBg.style.width = `${width}px`;
                activeBg.style.transform = `translateX(${left}px)`;
                
                if (!animate) {
                    setTimeout(() => {
                        activeBg.style.transition = "transform 0.3s ease-in-out, width 0.3s ease-in-out, opacity 0.5s ease-in-out";
                    }, 10);
                }
            }, 10);
        });
    }

    // Click handler for nav items
    navLinks.forEach(li => {
        li.addEventListener("click", function() {
            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            
            moveActiveBg(this);
            const activeContent = this.textContent.trim();
            updateContentDisplay(activeContent);
        });
    });






    // Initialize based on URL or default to Work
    function initializeNavigation() {
        const currentSection = getValidSectionFromUrl();
        let activeNavItem;
        
        navLinks.forEach(li => {
            const linkText = li.textContent.trim().toLowerCase();
            if (linkText === currentSection) {
                activeNavItem = li;
            }
        });
        
        if (!activeNavItem) {
            activeNavItem = document.querySelector("nav ul li:first-child");
        }
        
        navLinks.forEach(item => item.classList.remove("active"));
        activeNavItem.classList.add("active");
        
        // Update UI without animation first
        moveActiveBg(activeNavItem, false);
        updateContentDisplay(activeNavItem.textContent.trim());
    }








    // Handle back/forward navigation
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.section) {
            initializeNavigation();
        }
    });

    // Initialize navigation
    initializeNavigation();

    // Adjust on window resize
    window.addEventListener("resize", function() {
        const activeLi = document.querySelector("nav ul li.active");
        if (activeLi) {
            moveActiveBg(activeLi, false);
        }
    });

    // Tampilkan active-bg dengan fade-in setelah semua konten selesai dimuat
    window.addEventListener("load", function() {
        const activeLi = document.querySelector("nav ul li.active");
        if (activeLi) {
            // Pertama pastikan posisi dan ukuran sudah benar
            moveActiveBg(activeLi, false);
            
            // Kemudian fade-in
            setTimeout(() => {
                activeBg.style.opacity = "1";
            }, 300);
        }
    });
});



















/*====================================== Night Mode ====================================*/
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('nav ul li');
    const activeBg = document.querySelector('.active-bg');
    const footer = document.querySelector('.container-footer');
    const nightContainer = document.querySelector('.container-Night');
    const nightToggle = document.querySelector('.night-toggle');
    
    // Initialize animations with delays
    setTimeout(() => {
        footer.classList.add('animate');
        setTimeout(() => {
            nightContainer.classList.add('animate');
        }, 300); // Delay 300ms antara footer dan night container
    }, 500);
    
    // Navigation click handler
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Move active background
            activeBg.style.transform = `translateX(${index * 100}%)`;
            
            // Trigger animation for footer and night container with staggered delays
            footer.style.animation = 'none';
            nightContainer.style.animation = 'none';
            void footer.offsetWidth; // Trigger reflow
            void nightContainer.offsetWidth; // Trigger reflow
            
            // Reset opacity sebelum animasi baru dimulai
            footer.style.opacity = '0';
            nightContainer.style.opacity = '0';
            
            // Animasi footer dengan delay 0.3s
            setTimeout(() => {
                footer.style.animation = 'fadeDown 1s ease-out forwards';
            }, 300);
            
            // Animasi night container dengan delay 0.6s (0.3s setelah footer)
            setTimeout(() => {
                nightContainer.style.animation = 'fadeDown 1s ease-out forwards';
            }, 600);
        });
    });
    
    // Night mode toggle
    nightToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.body.classList.toggle('night-mode');
        
        // Trigger animation for footer and night container with staggered delays
        footer.style.animation = 'none';
        nightContainer.style.animation = 'none';
        void footer.offsetWidth;
        void nightContainer.offsetWidth;
        
        // Reset opacity sebelum animasi baru dimulai
        footer.style.opacity = '0';
        nightContainer.style.opacity = '0';
        
        // Animasi footer dengan delay 0.3s
        setTimeout(() => {
            footer.style.animation = 'fadeDown 1s ease-out forwards';
        }, 300);
        
        // Animasi night container dengan delay 0.6s (0.3s setelah footer)
        setTimeout(() => {
            nightContainer.style.animation = 'fadeDown 1s ease-out forwards';
        }, 600);
    });
});















/*====================================== efek scrool navigasi opacity ====================================*/
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector("nav");

    function handleNavScroll() {
        if (window.scrollY === 0) {
            navbar.style.background = "transparent";
            navbar.style.backdropFilter = "blur(0px)";
        } else {
            navbar.style.background = "var(--BlurNavbar)";
            navbar.style.backdropFilter = "blur(10px)";
        }
    }

    window.addEventListener("scroll", handleNavScroll);
    handleNavScroll();
});









/*====================================== menampilkan container release ====================================*/
function toggleRelease(event) {
    event.preventDefault(); // Mencegah link berpindah halaman
    let container = document.querySelector('.container-release');

    // Cek apakah elemen sedang ditampilkan atau tidak
    if (container.classList.contains('show')) {
        container.classList.remove('show'); // Sembunyikan jika sudah terbuka
    } else {
        container.classList.add('show'); // Tampilkan jika tertutup
    }
}








/*====================================== Night Mode ====================================*/
document.addEventListener("DOMContentLoaded", function () {
    const lines = document.querySelectorAll(".line-night");
    const activeControl = document.querySelector(".active-control");
    const icon = activeControl.querySelector("ion-icon");
    const root = document.documentElement; // Mengambil elemen root untuk CSS

    // Ambil jam saat ini
    const now = new Date();
    const currentHour = now.getHours(); // Mendapatkan angka jam 0-23

    // Cari elemen berdasarkan ID waktu yang sesuai
    const currentLine = document.getElementById(`night${currentHour}`) || document.getElementById(`afternoon${currentHour}`);

    // Jika elemen ditemukan, munculkan active control di atasnya
    if (currentLine) {
        moveActiveControl(currentLine, false);
    }

    // Tambahkan event listener untuk setiap garis
    lines.forEach(line => {
        line.addEventListener("click", function () {
            if (activeControl.classList.contains("show")) {
                activeControl.classList.add("hide");

                setTimeout(() => {
                    moveActiveControl(this);
                }, 100); // Tunggu animasi fade-down sebelum pindah
            } else {
                moveActiveControl(this);
            }
        });
    });

    // Saat layar diciutkan/diperbesar, active control langsung berpindah
    window.addEventListener("resize", function () {
        const activeLine = document.querySelector(".line-night.active");
        if (activeLine) {
            moveActiveControl(activeLine, true);
        }
    });

    function moveActiveControl(line, instant = false) {
        // Reset semua garis agar kembali pendek
        lines.forEach(l => l.classList.remove("active"));

        // Aktifkan garis yang diklik atau sesuai waktu
        line.classList.add("active");

        // Pindahkan active control
        const lineRect = line.getBoundingClientRect();
        const containerRect = document.querySelector(".line-container").getBoundingClientRect();
        activeControl.style.left = `${lineRect.left - containerRect.left + lineRect.width / 2 - 25}px`;

        // **Ganti ikon dan warna root berdasarkan ID line**
        if (line.id.includes("night")) {
            icon.setAttribute("name", "moon");
            root.classList.add("night-mode"); // **Menambahkan class night-mode**
        } else {
            icon.setAttribute("name", "sunny");
            root.classList.remove("night-mode"); // **Menghapus class night-mode**
        }

        // **Tampilkan active control**
        if (!instant) {
            activeControl.classList.remove("hide");
            activeControl.classList.add("show");
        } else {
            // Jika instant (resize), pindahkan langsung tanpa animasi fade
            activeControl.style.transition = "none";
            requestAnimationFrame(() => {
                activeControl.style.transition = "";
            });
        }
    }
});








// Theme Color Switcher based on Day/Night Mode
document.addEventListener("DOMContentLoaded", function() {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const root = document.documentElement;
    
    function updateThemeColor() {
        const isNightMode = root.classList.contains('night-mode');
        themeColorMeta.content = isNightMode ? '#233831' : '#ede7de';
    }
    
    // Initial check
    updateThemeColor();
    
    // Observe class changes on root element
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                updateThemeColor();
            }
        });
    });
    
    observer.observe(root, {
        attributes: true
    });
});





























let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  

});
