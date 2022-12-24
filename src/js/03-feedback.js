import throttle from 'lodash.throttle';

const formEl = document.querySelector(`.feedback-form`);
const feedbackForm = 'feedback-form-state';
const { email, message } = formEl;

formEl.addEventListener(`input`, throttle(onGetFormValues, 1000));
formEl.addEventListener(`submit`, onFormSubmit);

onPrintValuesFromStoreToTheForm();

function onGetFormValues(evt) {
  localStorage.setItem(feedbackForm, JSON.stringify
    ({ email: email.value,
       message: message.value,      
    })
  );
}

function onPrintValuesFromStoreToTheForm() {
  const savedData = JSON.parse(localStorage.getItem(feedbackForm));
  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(`Дані введені в форму: 
  email  ${email.value} 
  message  ${message.value}`);
  evt.currentTarget.reset();
  localStorage.removeItem(feedbackForm);
}