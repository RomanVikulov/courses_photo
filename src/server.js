const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Маршрут для обработки POST-запроса на /send-message
app.post('/send-message', (req, res) => {
  const { name, tel, comment } = req.body;
  const TOKEN = process.env.TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const message =
    `<b>Заявка с сайта!</b>\n` +
    `<b>Отправитель: </b> ${name}\n` +
    `<b>Телефон: </b> ${tel}\n` +
    `<b>Имя пользователя: </b> ${comment}`;

  axios
    .post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    })
    .then(_axiosRes => {
      res.status(200).json({ message: 'Сообщение отправлено!' });
    })
    .catch(error => {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Произошла ошибка при отправке сообщения' });
    });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
