const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Настройка nodemailer (используйте Gmail или другой SMTP)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // ваш email
    pass: 'your-app-password'     // придумать пароль приложения
  }
});

// Телеграм-бот
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // куда отправлять уведомления

// Роут для получения данных формы
app.post('/api/support', async (req, res) => {
  const { name, email, project, message } = req.body;

  // Отправка на почту
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'support@laser-studio.com',
    subject: `Новое обращение от ${name}`,
    text: `Имя: ${name}\nEmail: ${email}\nПроект: ${project || 'не указан'}\nСообщение: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);

    // Отправка в Telegram
    const telegramMessage = `Новое обращение в техподдержку:\n\nИмя: ${name}\nEmail: ${email}\nПроект: ${project || 'не указан'}\nСообщение: ${message}`;
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage
    });

    res.status(200).json({ message: 'Сообщение успешно отправлено!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при отправке сообщения.' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});