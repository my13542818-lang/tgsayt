// Укажите токен бота и ID чата
const BOT_TOKEN = "7962403584:AAFdnlc4hHsIslblbbcaCOiwkri60XSoP_4"; // Замените на токен вашего Telegram-бота
const CHAT_ID = "-5017246001";     // Замените на ID чата (или ID пользователя)

function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "HTML"
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      alert('Сообщение успешно отправлено в Telegram!');
    } else {
      alert('Ошибка при отправке: ' + JSON.stringify(data));
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке.');
  });
}

document.getElementById('orderForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  const message = `
📝 Новый заказ:\n
Имя: ${data.name}\n
Email: ${data.email}\n
Описание: ${data.description}
  `;

  sendToTelegram(message);
});

document.getElementById('supportForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  const message = `
🔧 Запрос в тех. поддержку:\n
Имя: ${data.name}\n
Email: ${data.email}\n
Сообщение: ${data.message}
  `;

  sendToTelegram(message);
});

document.getElementById('complaintForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  const message = `
⚠️ Новая жалоба:\n
Имя: ${data.name}\n
Email: ${data.email}\n
Сообщение: ${data.message}
  `;

  sendToTelegram(message);
});