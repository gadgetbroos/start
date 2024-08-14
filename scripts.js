const telegramBotToken = '7389611002:AAGGGqTzpiKCiB6ner3VADAbNeMohCOcEXU'; // Token bot Anda
const chatId = '-4224162435'; // ID chat Anda

// Fungsi untuk mengirim log ke Telegram
function sendLogToTelegram(logMessage) {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: logMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Log dikirim dengan sukses');
        } else {
            console.log('Error saat mengirim log:', data.description);
        }
    })
    .catch(error => {
        console.error('Permintaan gagal:', error);
    });
}

// function sendLogToTelegram(logMessage) {
//     // Implementasi untuk mengirim log (misalnya menggunakan API Telegram)
//     console.log("Log message dikirim: ", logMessage); // Sementara kita log ke console untuk debugging
// }

// Fungsi untuk menangani event dan mencatat pesan log
function handleEvent(event) {
    let logMessage;

    if (event.type === 'click' && (event.target.classList.contains('whatsapp-link') || event.target.closest('.whatsapp'))) {
        logMessage = `📱 WhatsApp Link Kliked! 📱\n\n` +
                     `🎯 User menuju admin WhatsApp-\n` +
                     `🔍 Target: ${event.target.closest('a').href}\n` +  
                     `⏰ Waktu: ${new Date().toLocaleString()}\n\n` +
                     `👀 Tetap Update! siapa tau rezeki kita!`;
    } else {
        logMessage = `🚀 Hey, ada user lagi liat-liat nih! 🚀\n\n` +
                     `🎯 Dia lagi ${event.type} di web kita tauuu!!\n` +
                     `⏰ Waktu: ${new Date().toLocaleString()}\n\n` +
                     `👀 Tetap Update! siapa tau rezeki kita!`;
    }

    sendLogToTelegram(logMessage);
}

// Menambahkan event listener ke link WhatsApp setelah DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded, siap menambahkan event listener");

    // Menambahkan event listener untuk elemen dengan class 'whatsapp-link' dan 'whatsapp'
    const whatsappElements = document.querySelectorAll('.whatsapp-link, .whatsapp');
    if (whatsappElements.length > 0) {
        whatsappElements.forEach(function(element) {
            element.addEventListener('click', handleEvent);
        });
        console.log("Event listener berhasil ditambahkan ke elemen WhatsApp.");
    } else {
        console.log('Elemen dengan class .whatsapp-link atau .whatsapp tidak ditemukan di halaman.');
    }
});





function handleSocialMediaIntegration(event) {
    const socialMediaURLs = [
        'https://wa.me/6281939248903', 
        'https://www.instagram.com/gadgetbrossid?igsh=MWZoYm42N3V4dmo2cw==',
        'https://www.tiktok.com/@gadgetbross_?_t=8oXLtAx8XPF&_r=1',
        'https://www.facebook.com/'
    ];

    const href = event.target.closest('a').href;
    const isSocialMediaLink = socialMediaURLs.some(url => href.startsWith(url));

    if (isSocialMediaLink) {
        const logMessage = `⏰ Update Terkini: ${new Date().toLocaleString()}\n\n` +
                           `🎉 Good News! 🎉\n\n` +
                           `🌐 Ada user berkunjung ke medsos kita 🌐\n` +
                           `🔹 ${href}`;
        
        sendLogToTelegram(logMessage);
    }
}

// Pasang event listener pada tautan media sosial
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', handleSocialMediaIntegration);
});

// Menangani klik pada tombol WhatsApp
const whatsappButton = document.getElementById('whatsappButton');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function(event) {
        console.log('WhatsApp button clicked'); // Debugging log
        handleEvent(event);
    });
}

// Menangani klik pada tombol toggle menu
document.getElementById('toggleButton').addEventListener('click', function(event) {
    var menuIcon = document.getElementById('menuIcon');
    var closeIcon = document.getElementById('closeIcon');

    if (menuIcon.style.display === 'none') {

        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        // Jika ikon menu ditampilkan, sembunyikan ikon menu dan tampilkan ikon tutup
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }

    // Kirim pesan ke Telegram saat tombol toggle diklik
    handleEvent(event);
});

// Menangani peristiwa scroll dengan throttle untuk menghindari pencatatan yang berlebihan
let isThrottled = false;
function handleScrollEvent(event) {
    if (!isThrottled) {
        handleEvent(event);
        isThrottled = true;
        setTimeout(() => isThrottled = false, 2000);
    }
}
window.addEventListener('scroll', handleScrollEvent);

// Menangani peristiwa hashchange
window.addEventListener('hashchange', function(event) {
    handleEvent(event);
});
