const btnLogin = document.getElementById('btnLogin');

const printLogin = (loginContainer,signUpContainer) => {
    btnLogin.addEventListener('click', ()=> {
        signUpContainer.classList.remove('signUp-active')
        loginContainer.classList.add('login-active')
        localStorage.removeItem("userCurrentState");
    })
}

export default printLogin;