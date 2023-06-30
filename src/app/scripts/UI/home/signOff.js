import { patchUsers } from "../../services/patchUsers";

const homeContainer = document.querySelector('.main');
const loginContainer = document.querySelector('.main-sign-in');

const signOff = (btnSignOff) => {
    btnSignOff.addEventListener('click', () => {
        homeContainer.classList.remove('home-active');
        loginContainer.classList.add('login-active');
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        patchUsers(currentUser.id, false)
        removeStorageData()
    })
}

const removeStorageData = () => {
    localStorage.removeItem("userCurrentState");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("contactId");

}

export default signOff;