import throttle from 'lodash.throttle';

const formEl = document.querySelector(`.feedback-form`);
const feedbackForm = 'feedback-form-state';

formEl.addEventListener(`input`, throttle(onGetFormValues, 1000));
formEl.addEventListener(`submit`, onFormSubmit);

let formData = {};

function onGetFormValues(evt) {
  formData[evt.target.name] = evt.target.value;  
  localStorage.setItem(feedbackForm, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();  
  console.log(formData);  

  evt.target.reset();
  localStorage.removeItem(feedbackForm);
}

try {
  const formDataObject = JSON.parse(localStorage.getItem(feedbackForm));
  for(const key in formDataObject){
    formEl.elements[key].value = formDataObject[key] || "";
  }
}  
  catch (err) {
    console.log(err.name);
    console.log(err.message);
  }