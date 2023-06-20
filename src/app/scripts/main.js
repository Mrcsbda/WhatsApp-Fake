import "../styles/styles.scss"
import { activeViews } from './UI/home/btnsActiveViews.js'
import printSignUp from "./UI/signIn/loadSignUp";
import loginValidation from "./UI/signIn/loginValidation.js"

const homeContainer = document.querySelector('.main');
const signUpContainer = document.querySelector('.main-sign-up')
const loginContainer = document.querySelector('.main-sign-in');
const userCurrentState = localStorage.getItem("userCurrentState");

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
loginValidation()
printSignUp()