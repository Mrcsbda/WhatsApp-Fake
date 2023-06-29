import "../styles/styles.scss"
import { activeViews } from './UI/home/btnsActiveViews.js'
import { closeEditContainer } from "./UI/home/closeEditMessage";
import loadLastMessage from "./UI/home/loadLastMessages";
import printListChats from "./UI/home/printListChats";
import { searchContact } from "./UI/home/searchContact";
import sendMessage from "./UI/home/sendMessage";
import signOff from "./UI/home/signOff";
import printSignUp from "./UI/signIn/loadSignUp";
import loginValidation from "./UI/signIn/loginValidation.js";
import registerUser from "./UI/signUp/registerUsers";
import printLogin from "./UI/signUp/returnLogin";

const homeContainer = document.querySelector('.main');
const signUpContainer = document.querySelector('.main-sign-up');
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
printListChats()
sendMessage()
registerUser(loginContainer, signUpContainer)
loginValidation(homeContainer,loginContainer)
printSignUp(loginContainer,signUpContainer)
printLogin(loginContainer, signUpContainer)
signOff(homeContainer,loginContainer)
loadLastMessage()
closeEditContainer()
searchContact()