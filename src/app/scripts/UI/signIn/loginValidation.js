import { getUsers } from "../../services/getUsers"
import { patchUsers } from "../../services/patchUsers";
import loginValidationAlerts from "./loginValidationAlerts";

const form = document.getElementById('form');
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');


const loginValidation = async (homeContainer,loginContainer) => {
    const data = await getUsers()
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const userFound = data.find(user => user.phone === userInput.value)
        if (userInput.value === "" || passwordInput.value === "") {
            loginValidationAlerts("emptyFields")
        } else if (!userFound) {
            loginValidationAlerts("nonExistentUser")
        } else if (passwordInput.value !== userFound.password) {
            loginValidationAlerts("incorrectPassword")
        } else {
            loginValidationAlerts("success", userFound)
            loginContainer.classList.remove('login-active');
            homeContainer.classList.add('home-active');
            localStorage.setItem("userCurrentState", "home");
            localStorage.setItem("currentUser", JSON.stringify(userFound));
            patchUsers(userFound.id, true)
        }
    })
}

export default loginValidation;

