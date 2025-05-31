document.addEventListener('DOMContentLoaded', function () {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const openBotBtn = document.querySelector('.open-Bot');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatContainer = document.getElementById('chatContainer');
    let scrollTimeout;

    function handleBodyScrollLock(lock) {
        if (window.innerWidth <= 767) {
            document.body.classList.toggle('no-scroll', lock);
        }
    }

    function updateUrlWithChatParam(shouldAdd) {
        const currentUrl = new URL(window.location.href);
        const searchParams = new URLSearchParams(currentUrl.search);
        if (shouldAdd) {
            searchParams.set('chat', 'open');
        } else {
            searchParams.delete('chat');
        }

        let newUrl = window.location.pathname;
        if (Array.from(searchParams).length > 0) {
            newUrl += '?' + searchParams.toString();
        }

        history.replaceState({ chat: shouldAdd ? 'open' : null }, '', newUrl);
    }

    function openBot() {
        chatbotContainer.classList.remove('hide');
        chatbotContainer.classList.add('show');
        chatbotContainer.style.display = 'flex';
        openBotBtn.style.display = 'none';
        handleBodyScrollLock(true);
        updateUrlWithChatParam(true);
    }

    function closeBot() {
        chatbotContainer.classList.remove('show');
        chatbotContainer.classList.add('hide');
        setTimeout(() => {
            chatbotContainer.style.display = 'none';
            openBotBtn.style.display = 'flex';
            handleBodyScrollLock(false);
            updateUrlWithChatParam(false);
        }, 400);
    }

    openBotBtn.addEventListener('click', openBot);
    closeChatbot.addEventListener('click', closeBot);

    function checkInitialChatState() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('chat') === 'open') {
            openBot();
        } else if (chatbotContainer.classList.contains('show')) {
            updateUrlWithChatParam(true);
        }
    }

    window.addEventListener('popstate', function () {
        const params = new URLSearchParams(window.location.search);
        if (params.get('chat') === 'open') {
            if (!chatbotContainer.classList.contains('show')) openBot();
        } else {
            if (chatbotContainer.classList.contains('show')) closeBot();
        }
    });

    window.addEventListener('scroll', () => {
        if (chatbotContainer.classList.contains('show')) {
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

    window.addEventListener('resize', () => {
        handleBodyScrollLock(chatbotContainer.classList.contains('show'));
    });

    checkInitialChatState();

    // ======================== CHATBOT SEND MESSAGE ======================== //

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addUserMessage(message);
        chatInput.value = '';
        showTypingIndicator();

        try {
            const response = await fetch("https://n8n-tdlnivln.ap-southeast-1.clawcloudrun.com/webhook/557eeb54-0b87-4aae-b72c-aa3e38bc41f4", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) throw new Error("Server error");

            let botMessage = await response.text();

            try {
                const jsonResponse = JSON.parse(botMessage);
                if (jsonResponse.message) {
                    botMessage = jsonResponse.message;
                }
            } catch (e) { }

            botMessage = botMessage
                .replace(/<br\s*\/?>/g, '\n')
                .replace(/<\/?strong>/g, '')
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/\*\*(.*?)\*\*/g, '$1')
                .replace(/### (.*?)\n/g, '$1:\n')
                .replace(/- /g, '• ')
                .replace(/\. /g, '.\n\n')
                .replace(/(\d+\.)/g, '\n$1')
                .replace(/\n?• /g, '\n• ')
                .replace(/\n{3,}/g, '\n\n')
                .trim();

            removeTypingIndicator();
            addBotMessage(botMessage);

        } catch (error) {
            console.error("Error:", error);
            removeTypingIndicator();
            addBotMessage("Maaf, terjadi kesalahan. Silakan coba lagi nanti.");
        }

        scrollToBottom();
    }

    // ======================== UI Message Helpers ======================== //

    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('User-Answer');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }

    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('Bot-Answer');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('typing-indicator');
        typingElement.id = 'typingIndicator';
        typingElement.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingElement);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingElement = document.getElementById('typingIndicator');
        if (typingElement) {
            typingElement.remove();
        }
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // ======================== EVENT HANDLERS ======================== //

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    document.querySelectorAll('.Selection-user').forEach(button => {
        button.addEventListener('click', function () {
            const message = this.textContent;
            chatInput.value = message;
            sendMessage();
        });
    });
});
