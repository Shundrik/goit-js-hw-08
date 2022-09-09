import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";
const formData = {};

const refs = {
  form: document.querySelector(".feedback-form"),
  input: document.querySelector("input"),
  textarea: document.querySelector("textarea"),
};

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", throttle(onFormInput, 500));
// refs.textarea.addEventListener("input", onTextareaInput);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  const dateJson = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, dateJson);
}

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

applyForm();

function applyForm() {
  const saveForm = localStorage.getItem(STORAGE_KEY);
  //   console.log("проверка хранилища:",saveForm);

  if (saveForm) {
    try {
      const formJsonParse = JSON.parse(saveForm);
      const emailData = !formJsonParse.email ? "" : formJsonParse.email;
      const messegeData = !formJsonParse.message ? "" : formJsonParse.message;
      refs.input.value = emailData;
      refs.textarea.value = messegeData;
    } catch (error) {
      console.log("parsing error");
    }
  }
}
