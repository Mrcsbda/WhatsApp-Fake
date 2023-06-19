import "../styles/styles.scss"
import {activeViews} from './UI/home/btnsActiveViews.js'
import { loginValidation } from "./UI/signIn/loginValidation.js"
const userCurrentState = localStorage.getItem("userCurrentState");
const loginContainer = document.querySelector('.main-sign-in');
const homeContainer = document.querySelector('.main');

document.addEventListener('DOMContentLoaded', ()=> {
    switch(true) {
        case !userCurrentState:
            loginContainer.classList.add('login-active')
            homeContainer.classList.remove('home-active')
            break;
        case userCurrentState === "home":
            loginContainer.classList.remove('login-active')
            homeContainer.classList.add('home-active')
            break;
        default:
            loginContainer.classList.remove('login-active')
            homeContainer.classList.remove('home-active')
            break;
    }
})

activeViews()
loginValidation()