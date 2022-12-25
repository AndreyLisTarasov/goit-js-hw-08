import throttle from 'lodash.throttle';

const formEl = document.querySelector(`.feedback-form`);
const textarea = formEl.querySelector('textarea');
const input = formEl.querySelector('input');
const feedbackForm = 'feedback-form-state';
const { email, message } = formEl;

formEl.addEventListener(`input`, throttle(onGetFormValues, 1000));
formEl.addEventListener(`submit`, onFormSubmit);

let formData = {};

onPrintValuesFromStoreToTheForm();

function onGetFormValues(evt) {
  formData[evt.target.name] = evt.target.value;  
  localStorage.setItem(feedbackForm, JSON.stringify(formData));
}

function onPrintValuesFromStoreToTheForm() {
  formData = JSON.parse(localStorage.getItem(feedbackForm)) || {};
  if (formData) {
    input.value = formData.email || '';
    textarea.value = formData.message || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();  

  const formDataObject = JSON.parse(localStorage.getItem(feedbackForm)) || {};
  console.log(formDataObject);

  evt.target.reset();
  localStorage.removeItem(feedbackForm);
}