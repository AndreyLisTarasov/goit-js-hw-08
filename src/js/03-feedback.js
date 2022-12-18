import throttle from 'lodash.throttle';

const formRef = document.querySelector(`.feedback-form`);
const FEEDBACK_FORM_KEY = 'feedback-form-state';
const { email, message } = formRef;

formRef.addEventListener(`input`, throttle(onGetFormValues, 1000));
formRef.addEventListener(`submit`, onFormSubmit);

onPrintValuesFromStoreToTheForm();

function onGetFormValues(e) {
  localStorage.setItem(
    FEEDBACK_FORM_KEY,
    JSON.stringify({
      email: email.value,
      message: message.value,
    })
  );
}

function onPrintValuesFromStoreToTheForm() {
  const savedData = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY));

  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(`Данні введені в форму: 
  email  ${email.value} 
  message  ${message.value}`);

  e.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_FORM_KEY);
}
