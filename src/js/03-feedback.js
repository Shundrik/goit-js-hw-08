import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

applyForm();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  const dateJson = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, dateJson);
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  formData = {};
}

function applyForm() {
  let saveForm = localStorage.getItem(STORAGE_KEY);
  // console.log('проверка хранилища:', saveForm);

  if (saveForm) {
    saveForm = JSON.parse(saveForm);
    Object.entries(saveForm).forEach(([name, value]) => {
      formData[name] = value;
      refs.form.elements[name].value = value;
    });
  }
}
