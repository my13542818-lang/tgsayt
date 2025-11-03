// Универсальная функция для отправки сообщений в Telegram
async function sendToTelegram(message) {
    const botToken = '7962403584:AAFdnlc4hHsIslblbbcaCOiwkri60XSoP_4'; // ВАШ ТОКЕН
    const chatId = '-5017246001'; // ВАШ ЧАТ

    try {
        // УБРАН ПРОБЕЛ В URL
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();

        if (result.ok) {
            return true; // Успешно отправлено
        } else {
            console.error("Ошибка Telegram API:", result.description);
            return false;
        }
    } catch (err) {
        console.error("Ошибка сети:", err);
        return false;
    }
}

// Обработчик формы техподдержки
document.getElementById("supportForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name_support").value;
    const email = document.getElementById("email_support").value;
    const project = document.getElementById("project").value;
    const message = document.getElementById("message_support").value;

    const telegramMessage = `Новое обращение в техподдержку сайт основной :\n\nИмя: ${name}\nEmail: ${email}\nПроект: ${project || 'не указан'}\nСообщение: ${message}`;

    const success = await sendToTelegram(telegramMessage);
    if (success) {
        alert("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
        this.reset();
    } else {
        alert("Ошибка при отправке в Telegram. Попробуйте позже.");
    }
});

// Обработчик формы жалоб
document.getElementById("complaintForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name_complaint").value;
    const email = document.getElementById("email_complaint").value;
    const message = document.getElementById("message_complaint").value;

    const telegramMessage = `Новая жалоба:\n\nИмя: ${name}\nEmail: ${email}\nТекст жалобы: ${message}`;

    const success = await sendToTelegram(telegramMessage);
    if (success) {
        alert("Жалоба отправлена! Мы свяжемся с вами в ближайшее время.");
        this.reset();
    } else {
        alert("Ошибка при отправке в Telegram. Попробуйте позже.");
    }
});

// Обработчик формы оплаты
document.getElementById("paymentForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const orderType = document.getElementById("orderType").value;
    const name = document.getElementById("name_payment").value;
    const email = document.getElementById("email_payment").value;
    const phone = document.getElementById("phone_payment").value;

    // Объект с ценами и ссылками для оплаты (новые суммы и ссылки)
    const paymentOptions = {
        "Сайт-визитка": {
            amount: "1000",
            link: "https://yoomoney.ru/to/4100119320974854" // Базовая ссылка
        },
        "2D игра": {
            amount: "50",
            link: "https://yoomoney.ru/fundraise/1DQ1OAC8EIP.251103" // Работает
        },
        "3D игра": {
            amount: "100",
            link: "https://yoomoney.ru/to/4100119320974854" // Базовая ссылка
        },
        "Мобильное приложение": {
            amount: "750",
            link: "https://yoomoney.ru/fundraise/1DQ1R2VA84M.251103" // Работает
        }
    };

    // Если выбрана услуга, требующая специфичную ссылку (не базовую)
    let selectedLink = paymentOptions[orderType].link;
    let amountForMessage = paymentOptions[orderType].amount;

    // Сообщение в Telegram
    const telegramMessage = `Новый заказ на оплату:\n\nТип: ${orderType}\nИмя: ${name}\nEmail: ${email}\nТелефон: ${phone}\nСумма: ${amountForMessage} ₽`;

    const success = await sendToTelegram(telegramMessage);
    if (success) {
        // Открываем соответствующую ссылку для оплаты
        alert("Заказ отправлен! Перейдите по ссылке для оплаты.");
        window.open(selectedLink, '_blank');
    } else {
        alert("Ошибка при отправке в Telegram. Попробуйте позже.");
    }
});