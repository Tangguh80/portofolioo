/*====================================== Navigasi Navbar utama ====================================*/

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li");
    const activeBg = document.querySelector(".active-bg");

    function moveActiveBg(target, animate = true) {
        if (!target) return;

        requestAnimationFrame(() => {
            setTimeout(() => {
                const targetRect = target.getBoundingClientRect();
                const navRect = target.parentElement.getBoundingClientRect();

                if (!animate) {
                    activeBg.style.transition = "none";
                } else {
                    activeBg.style.transition = "transform 0.3s ease-in-out, width 0.3s ease-in-out, opacity 0.5s ease-in-out";
                }

                activeBg.style.width = `${target.offsetWidth}px`;
                activeBg.style.transform = `translateX(${target.offsetLeft}px)`;

                if (!animate) {
                    setTimeout(() => {
                        activeBg.style.transition = "transform 0.3s ease-in-out, width 0.3s ease-in-out, opacity 0.5s ease-in-out";
                    }, 50);
                }
            }, 10);
        });
    }

    navLinks.forEach((li) => {
        li.addEventListener("click", function () {
            document.querySelector("nav ul li.active")?.classList.remove("active");
            this.classList.add("active");
            moveActiveBg(this);
        });
    });

    // Efek muncul dengan opacity saat halaman pertama kali dimuat
    window.addEventListener("load", function () {
        const activeLi = document.querySelector("nav ul li.active");
        if (activeLi) {
            moveActiveBg(activeLi, false);
        } else {
            console.warn("Tidak ada elemen <li> dengan class 'active' ditemukan.");
        }

        // Tambahkan efek fade-in setelah load
        setTimeout(() => {
            activeBg.style.opacity = "1";
        }, 300); // Delay agar efek lebih natural
    });

    // Menyesuaikan kembali saat jendela di-resize tanpa animasi
    window.addEventListener("resize", function () {
        moveActiveBg(document.querySelector("nav ul li.active"), false);
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
