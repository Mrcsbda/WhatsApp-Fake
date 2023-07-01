const btnSignUp = document.getElementById('btnSignIn');

const printSignUp = (loginContainer, signUpContainer) => {
    btnSignUp.addEventListener('click', ()=> {
        signUpContainer.classList.add('signUp-active')
        loginContainer.classList.remove('login-active')
        localStorage.setItem("userCurrentState", "signUp");
    })
}

export default printSignUp;