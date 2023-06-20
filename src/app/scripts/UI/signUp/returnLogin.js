const btnLogin = document.getElementById('btnLogin');
const loginContainer = document.querySelector('.main-sign-in');
const signUpContainer = document.querySelector('.main-sign-up');

const printLogin = () => {
    btnLogin.addEventListener('click', ()=> {
        signUpContainer.classList.remove('signUp-active')
        loginContainer.classList.add('login-active')
        localStorage.removeItem("userCurrentState");
    })
}

export default printLogin;