const homeContainer = document.querySelector('.main');
const loginContainer = document.querySelector('.main-sign-in');
const btnSignOff = document.getElementById('btnSignOff');

const signOff = () => {
    btnSignOff.addEventListener('click', ()=> {
        homeContainer.classList.remove('home-active');
        loginContainer.classList.add('login-active');
        localStorage.removeItem("userCurrentState");
        localStorage.removeItem("currentUser");
    })
}

export default signOff;