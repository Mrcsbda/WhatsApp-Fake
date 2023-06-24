import { patchUsers } from "../../services/patchUsers";

const btnSignOff = document.getElementById('btnSignOff');

const signOff = (homeContainer, loginContainer) => {
    btnSignOff.addEventListener('click', ()=> {
        homeContainer.classList.remove('home-active');
        loginContainer.classList.add('login-active');
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        patchUsers(currentUser.id, false)
        localStorage.removeItem("userCurrentState");
        localStorage.removeItem("currentUser");
    })
}

export default signOff;