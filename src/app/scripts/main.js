import "../styles/styles.scss"
import { activeViews } from './UI/home/btnsActiveViews.js'
import signOff from "./UI/home/signOff";
import printSignUp from "./UI/signIn/loadSignUp";
import loginValidation from "./UI/signIn/loginValidation.js"
import registerUser from "./UI/signUp/registerUsers.js";
import printLogin from "./UI/signUp/returnLogin";
import {endpoints} from "./services/data.js"

const homeContainer = document.querySelector('.main');
const signUpContainer = document.querySelector('.main-sign-up');
const loginContainer = document.querySelector('.main-sign-in');
const userCurrentState = localStorage.getItem("userCurrentState");

const formSignUp = document.getElementById('form_signUp');

document.addEventListener('DOMContentLoaded', () => {
    switch (true) {
        case !userCurrentState:
            loginContainer.classList.add('login-active')
            break;
        case userCurrentState === "home":
            homeContainer.classList.add('home-active')
            break;
        case userCurrentState === "signUp":
            signUpContainer.classList.add('signUp-active')
            break;
        default:
            break;
    }
})

activeViews()
loginValidation(homeContainer,loginContainer)
printSignUp(loginContainer,signUpContainer)
printLogin(loginContainer, signUpContainer)
signOff(homeContainer,loginContainer)

formSignUp.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = endpoints.urlUsers;
    registerUser(formSignUp, url);
});