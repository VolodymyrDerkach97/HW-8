const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const formData = {};
const STORAGE_KEY = 'feedback-form-state';
populateInput();

form.addEventListener('input', throttle(onSetLocalStorage, 500));
form.addEventListener('submit', onSubmit);

function populateInput() {
  const saveValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saveValue) {
    form.message.value = saveValue.message || '';
    form.email.value = saveValue.email || '';
  }
}

function onSetLocalStorage(e) {
  const value = e.target.value;
  const name = e.target.name;

  formData[name] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();

  const formEl = e.currentTarget;

  let email = formEl.elements.namedItem('email').value;
  let message = formEl.elements.namedItem('message').value;

  if (!email || !message) {
    alert('Всі поля повинні бути заповнені');
  } else {
    console.log(formData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}
