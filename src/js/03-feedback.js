import throttle from 'lodash.throttle';

const form = document.querySelector("form");

const FEEDBACK_STATE = 'feedback-form-state';

form.addEventListener("input", throttle(onFormInput, 500));
form.addEventListener("submit",  onFormSubmit)
filledForm();

function onFormInput(evt) {
    
    let formData = localStorage.getItem(FEEDBACK_STATE);
    formData = formData ? JSON.parse(formData) : {};
    formData[evt.target.name] = evt.target.value
    localStorage.setItem(FEEDBACK_STATE, JSON.stringify(formData))
}

function onFormSubmit(evt) {
    evt.preventDefault();

    const {
        elements: { email, message }
    } = evt.currentTarget;
    if (email.value === "" || message.value === "") {
    alert("Заповніть поля")
    } else {
    console.log(JSON.parse(localStorage.getItem(FEEDBACK_STATE)))
        
    evt.currentTarget.reset();
    localStorage.removeItem(FEEDBACK_STATE);
    }
}

function filledForm() {
    
    let savedData = localStorage.getItem(FEEDBACK_STATE);
    if(savedData) {
        savedData = JSON.parse(savedData);

        Object.entries(savedData).forEach(([name, value]) => {
            form.elements[name].value = value;
        });
    }
}
