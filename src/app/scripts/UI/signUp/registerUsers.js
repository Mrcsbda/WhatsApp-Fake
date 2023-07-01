import { getUsers } from "../../services/getUsers";
import postUser from "../../services/postUsers";
import validationAlerts from "../validationAlerts";
const inputName = document.querySelector('.name');
const inputPhone = document.querySelector('.phone');
const inputPassword = document.querySelector('.password');
const inputImage = document.querySelector('.image');
const inputInfo = document.querySelector('.info');
const formSignUp = document.getElementById('form_signUp');

const registerUser = async (loginContainer, signUpContainer) => {
  
    formSignUp.addEventListener('submit', async (e) => {
        e.preventDefault();
        const existsNumber = await validationUser(inputPhone.value);
        if (emptyInputsValidation()) {
            validationAlerts("emptyFields");
        } else if (existsNumber) {
            validationAlerts("existenPhone");
        } else {
            const user = newUser();
            postUser(user);
            validationAlerts("successfulRegistration");
            formSignUp.reset()
            signUpContainer.classList.remove('signUp-active')
            loginContainer.classList.add('login-active')
            localStorage.removeItem("userCurrentState");    
        }
    });
}

const emptyInputsValidation = () => {
    return inputName.value === "" ||
        inputPhone.value === "" ||
        inputPassword.value === "" ||
        inputImage.value === "" ||
        inputInfo.value === ""
}

const newUser = () => {
    return {
        name: inputName.value,
        phone: inputPhone.value,
        password: inputPassword.value,
        image: inputImage.value,
        lastTime: new Date().getTime(),
        isOnline: false,
        info: inputInfo.value
    }
}

const validationUser = async (phoneUser) => {
    const data = await getUsers();
    const phoneFound = data.find(user => user.phone === phoneUser);
    return phoneFound?true:false
}

export default registerUser;