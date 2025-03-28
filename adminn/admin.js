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
                }, 300); // Tunggu animasi fade-down sebelum pindah
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










