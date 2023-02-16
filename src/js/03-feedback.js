const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const formData = {};
const result = {};
const STORAGE_KEY = 'feedback-form-state';
populateInput();

form.addEventListener('input', throttle(onSetLocalStorage, 500));
form.addEventListener('submit', onSubmit);

function populateInput() {
  const saveValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saveValue) {
    form.elements.namedItem('message').value = saveValue.message || '';
    form.elements.namedItem('email').value = saveValue.email || '';
  }
}

function onSetLocalStorage(e) {
  const value = e.target.value;
  const name = e.target.name;

  formData[name] = value;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

function onSubmit(e) {
  e.preventDefault();

  const formEl = e.currentTarget;

  let email = formEl.elements.namedItem('email').value;
  let message = formEl.elements.namedItem('message').value;

  if (!email || !message) {
    alert('Всі поля повинні бути заповнені');
  } else {
    result['email'] = email;
    result['message'] = message;
  }

  console.log(result);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
