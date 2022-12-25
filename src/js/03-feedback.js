import throttle from 'lodash.throttle';

const formEl = document.querySelector(`.feedback-form`);
const textarea = formEl.querySelector('textarea');
const input = formEl.querySelector('input');
const feedbackForm = 'feedback-form-state';
const { email, message } = formEl;

formEl.addEventListener(`input`, throttle(onGetFormValues, 1000));
formEl.addEventListener(`submit`, onFormSubmit);

onPrintValuesFromStoreToTheForm();

function onGetFormValues(evt) {
  const formData = {
    email: formEl.email.value,
    message: formEl.message.value,
  };
  localStorage.setItem(feedbackForm, JSON.stringify(formData));
}

function onPrintValuesFromStoreToTheForm() {
  if (localStorage.getItem(feedbackForm)) {
    const saveData = JSON.parse(localStorage.getItem(feedbackForm)) || {};

    textarea.value = saveData.message || '';
    input.value = saveData.email || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const formDataObject = JSON.parse(localStorage.getItem(feedbackForm)) || {};
  console.log(formDataObject);

  evt.target.reset();
  localStorage.removeItem(feedbackForm);
}