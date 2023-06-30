import "../styles/styles.scss"
import printInfoUsers from "./UI/home/printInfoUsers";
import { closeEditContainer } from "./UI/home/closeEditMessage";
import loadLastMessage from "./UI/home/loadLastMessages";
import printListChats from "./UI/home/printListChats";
import { searchContact } from "./UI/home/searchContact";
import sendMessage from "./UI/home/sendMessage";
import printSignUp from "./UI/signIn/loadSignUp";
import loginValidation from "./UI/signIn/loginValidation.js";
import registerUser from "./UI/signUp/registerUsers";
import printLogin from "./UI/signUp/returnLogin";
import { searchMessages } from "./UI/home/searchMessages";

const homeContainer = document.querySelector('.main');
const loginContainer = document.querySelector('.main-sign-in');
const signUpContainer = document.querySelector('.main-sign-up');
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

printInfoUsers()
printListChats()
sendMessage()
registerUser(loginContainer, signUpContainer)
loginValidation(homeContainer, loginContainer)
printSignUp(loginContainer, signUpContainer)
printLogin(loginContainer, signUpContainer)
loadLastMessage()
closeEditContainer()
searchContact()
searchMessages()

