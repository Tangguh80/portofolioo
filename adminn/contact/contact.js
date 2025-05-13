/*====================================== script tombol open Bot====================================*/
const openBotBtn = document.querySelector('.open-Bot');
const containerBot = document.querySelector('.container-Bot');
const closeBotBtn = document.querySelector('.close-btn-bot');
let scrollTimeout;

function handleBodyScrollLock(lock) {
  if (window.innerWidth <= 767) {
    document.body.classList.toggle('no-scroll', lock);
  }
}

// Function to update URL with chat parameter
function updateUrlWithChatParam(shouldAdd) {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);
  
  if (shouldAdd) {
    searchParams.set('chat', 'open');
  } else {
    searchParams.delete('chat');
  }
  
  // Build new URL with all parameters
  let newUrl = window.location.pathname;
  if (Array.from(searchParams).length > 0) {
    newUrl += '?' + searchParams.toString();
  }
  
  // Use replaceState instead of pushState to prevent adding to history
  history.replaceState({ chat: shouldAdd ? 'open' : null }, '', newUrl);
}

// Check if chat should be open on page load
function checkInitialChatState() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('chat') === 'open') {
    openBot();
  } else if (containerBot.classList.contains('show')) {
    // If bot is shown but no chat parameter, add it
    updateUrlWithChatParam(true);
  }
}

function openBot() {
  containerBot.classList.remove('hide');
  containerBot.classList.add('show');
  containerBot.style.display = 'flex';
  openBotBtn.style.display = 'none';
  handleBodyScrollLock(true);
  updateUrlWithChatParam(true);
}

function closeBot() {
  containerBot.classList.remove('show');
  containerBot.classList.add('hide');

  setTimeout(() => {
    containerBot.style.display = 'none';
    openBotBtn.style.display = 'flex';
    handleBodyScrollLock(false);
    updateUrlWithChatParam(false);
  }, 400);
}

openBotBtn.addEventListener('click', openBot);
closeBotBtn.addEventListener('click', closeBot);

// Handle popstate events
window.addEventListener('popstate', function(event) {
  const params = new URLSearchParams(window.location.search);
  if (params.get('chat') === 'open') {
    if (!containerBot.classList.contains('show')) {
      openBot();
    }
  } else {
    if (containerBot.classList.contains('show')) {
      closeBot();
    }
  }
});

// Scroll behavior (tetap sama)
window.addEventListener('scroll', () => {
  if (containerBot.classList.contains('show')) {
    openBotBtn.style.display = 'none';
    return;
  }

  openBotBtn.style.opacity = '0.5';
  clearTimeout(scrollTimeout);

  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if ((scrollTop + windowHeight) >= (documentHeight - 400)) {
    openBotBtn.style.display = 'none';
  } else {
    openBotBtn.style.display = 'flex';
  }

  scrollTimeout = setTimeout(() => {
    openBotBtn.style.opacity = '1';
  }, 200);
});

// Resize handler (tetap sama)
window.addEventListener('resize', () => {
  if (containerBot.classList.contains('show')) {
    handleBodyScrollLock(true);
  } else {
    handleBodyScrollLock(false);
  }
});

// Initialize chat state on page load
document.addEventListener('DOMContentLoaded', checkInitialChatState);










/*====================================== Bot Model ====================================*/
document.addEventListener("DOMContentLoaded", function () {
    const selections = document.querySelectorAll(".Selection-user");
    const chatContainer = document.querySelector(".container-chat");

    const botResponses = {
        "Hanya menyapa": [
            "Halo juga! 😊",
            "Terima kasih telah mengunjungi portofolio saya.",
            "Semoga Anda menemukan informasi yang bermanfaat.",
            "Ada yang bisa saya bantu? 🤔"
        ],
        "Tentang Latar Belakang Pendidikan": [
            "Saya lulusan D3 Teknik Listrik dari Politeknik Negeri Cilacap (2023-2026) dengan spesialisasi di:",
            "▪ Sistem kontrol berbasis PLC",
            "▪ Manajemen distribusi daya",
            "▪ Analisis kelayakan bangunan untuk SLF",
            "Sebelumnya saya bersekolah di SMKN Nusawungu jurusan Teknik Instalasi Tenaga Listrik."
        ],
        "Pengalaman Kerja/Praktik": [
            "Pengalaman profesional saya:",
            "▪ Praktek di PT Panasonic (instalasi sistem pendingin)",
            "▪ Magang di PT INDOCERIA PLASTIK & PRINTING",
            "▪ Konsultan SLF bangunan (analisis kelistrikan dan K3)",
            "▪ Media Organizer di UKM Logic Robotic"
        ],
        "Keahlian Teknis": [
            "Keahlian teknis yang saya kuasai:",
            "▪ CX-Programmer (PLC)",
            "▪ AutoCAD (desain instalasi listrik)",
            "▪ ETAP (analisis sistem tenaga)",
            "▪ PVsyst (desain PLTS)",
            "Lihat semua skill > [tombol]"
        ],
        "Proyek yang Pernah Dikerjakan": [
            "Beberapa proyek unggulan:",
            "▪ Pembuatan mesin otomatis (tugas akhir)",
            "▪ Laporan SLF bangunan (project dosen)",
            "▪ Dokumentasi perlombaan robotic",
            "Ingin Melihat lebih lengkap?"
        ],
        "Ingin hubungi langsung": [
            "Baik Saya senang anda mau Menghubungi saya. 🤗",
            "Silahkan pilih metode yang mau dihubungi:"
        ]
    };

    const contactOptions = {
        "Email": [
            "Silahkan kirimkan pesan ke email:",
            "tangguh880@gmail.com",
            "Ada yang bisa saya Bantu lagi? 🤔"
        ],
        "WhatsApp": [
            "Silahkan Kirim pesan atau nomor telpon di bawah:",
            "085802494720",
            "Ada yang bisa saya Bantu lagi? 🤔"
        ],
        "Telegram": [
            "Silahkan Chat ke link telegram saya:",
            "https://t.me/085802494720",
            "Ada yang bisa saya Bantu lagi? 🤔"
        ]
    };

    const projectOptions = {
        "Lihat Selengkapnya": [
            "Silahkan Tekan Navigasi 'Work'",
            "Lalu scroll paling bawah"
        ],
        "Opsi Lainnya": [
            "Ada yang bisa saya bantu lagi? 🤔"
        ]
    };



    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function showBotMessages(messages, index = 0, callback) {
        if (index >= messages.length) {
            if (callback) callback();
            return;
        }

        setTimeout(() => {
            const botDiv = document.createElement("div");
            botDiv.className = "Bot-Answer";
            botDiv.textContent = messages[index];

            const firstButton = chatContainer.querySelector(".Selection-user");
            chatContainer.insertBefore(botDiv, firstButton);

            scrollToBottom();
            showBotMessages(messages, index + 1, callback);
        }, 1000);
    }




/*====================================== Fungsi Sub Button tambahan ====================================*/
    function showContactResponse(method) {
        const responses = contactOptions[method];

        showBotMessages(responses, 0, () => {
            showMainButtons();
        });
    }

    function showProjectResponse(option) {
        const responses = projectOptions[option];

        showBotMessages(responses, 0, () => {
            showMainButtons();
        });
    }


    function createContactButtons() {
        ["Email", "WhatsApp", "Telegram"].forEach(method => {
            const btn = document.createElement("button");
            btn.className = "Selection-user";
            btn.textContent = method;
    
            btn.addEventListener("click", () => {
                insertUserAnswer(method);
    
                const otherBtns = chatContainer.querySelectorAll(".Selection-user");
                otherBtns.forEach(b => {
                    if (["Email", "WhatsApp", "Telegram"].includes(b.textContent)) {
                        b.remove();
                    }
                });
    
                setTimeout(() => {
                    showContactResponse(method);
                }, 500);
            });
    
            chatContainer.appendChild(btn);
            scrollToBottom(); // <-- PENTING DI SINI
        });
    }
    

    function createProjectButtons() {
        ["Lihat Selengkapnya", "Opsi Lainnya"].forEach(option => {
            const btn = document.createElement("button");
            btn.className = "Selection-user";
            btn.textContent = option;
    
            btn.addEventListener("click", () => {
                insertUserAnswer(option);
    
                const otherBtns = chatContainer.querySelectorAll(".Selection-user");
                otherBtns.forEach(b => {
                    if (["Lihat Selengkapnya", "Opsi Lainnya"].includes(b.textContent)) {
                        b.remove();
                    }
                });
    
                setTimeout(() => {
                    showProjectResponse(option);
                }, 500);
            });
    
            chatContainer.appendChild(btn);
            scrollToBottom(); // <-- PENTING DI SINI JUGA
        });
    }
    



/*====================================== fungsi lainya dari Bot ====================================*/
    function insertUserAnswer(text) {
        const userDiv = document.createElement("div");
        userDiv.className = "User-Answer";
        userDiv.textContent = text;
        userDiv.style.display = "inline-block";

        const firstButton = chatContainer.querySelector(".Selection-user");
        chatContainer.insertBefore(userDiv, firstButton);
        scrollToBottom();
    }

    function showMainButtons() {
        selections.forEach(b => {
            b.style.display = "inline-block";
            chatContainer.appendChild(b);
        });
        scrollToBottom();
    }

    selections.forEach(btn => {
        btn.addEventListener("click", () => {
            const userText = btn.textContent;
            insertUserAnswer(userText);

            selections.forEach(b => b.style.display = "none");

            if (userText === "Ingin hubungi langsung") {
                showBotMessages(botResponses[userText], 0, () => {
                    createContactButtons();
                });
            } else if (userText === "Proyek yang Pernah Dikerjakan") {
                showBotMessages(botResponses[userText], 0, () => {
                    createProjectButtons();
                });
            } else {
                showBotMessages(botResponses[userText], 0, () => {
                    showMainButtons();
                });
            }
        });
    });
});
