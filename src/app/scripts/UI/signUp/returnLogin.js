const btnLogin = document.getElementById('btnLogin');
const formSignUp = document.getElementById('form_signUp');

const printLogin = (loginContainer,signUpContainer) => {
    btnLogin.addEventListener('click', ()=> {
        signUpContainer.classList.remove('signUp-active')
        loginContainer.classList.add('login-active')
        localStorage.removeItem("userCurrentState");
        formSignUp.reset()
    })
}

export default printLogin;