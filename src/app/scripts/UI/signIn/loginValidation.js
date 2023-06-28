import { getUsers } from "../../services/getUsers"
import { patchUsers } from "../../services/patchUsers";
import loadLastMessage from "../home/loadLastMessages";
import printListChats from "../home/printListChats";
import validationAlerts from "../validationAlerts";

const form = document.getElementById('form');
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');


const loginValidation = async (homeContainer,loginContainer) => {
    const data = await getUsers()
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const userFound = data.find(user => user.phone === userInput.value)
        if (userInput.value === "" || passwordInput.value === "") {
            validationAlerts("emptyFields")
        } else if (!userFound) {
            validationAlerts("nonExistentUser")
        } else if (passwordInput.value !== userFound.password) {
            validationAlerts("incorrectPassword")
        } else {
            validationAlerts("success", userFound)
            loginContainer.classList.remove('login-active');
            homeContainer.classList.add('home-active');
            localStorage.setItem("userCurrentState", "home");
            localStorage.setItem("currentUser", JSON.stringify(userFound));
            patchUsers(userFound.id, true)
            loadLastMessage()
            printListChats()
        }
    })
}

export default loginValidation;

