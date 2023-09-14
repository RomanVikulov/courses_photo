const success = document.getElementById('success');

document.getElementById('tg').addEventListener('submit', function (e) {
  e.preventDefault();

  let name = this.name.value;
  let tel = this.tel.value;
  let comment = this.comment.value;

  axios
    .post('/send-message', { name, tel, comment })
    .then(res => {
      console.log('Статус ответа:', res.status);
      console.log('Данные ответа:', res.data);

      this.name.value = '';
      this.tel.value = '';
      this.comment.value = '';
      success.innerHTML = 'Сообщение отправлено!';
      success.style.display = 'block';
    })

    .catch(err => {
      console.warn(err);
    })
    .finally(() => {
      console.log('Отправили!');
    });
});
