const btnSignUp = document.getElementById('btnSignIn');
const loginContainer = document.querySelector('.main-sign-in');
const signUpContainer = document.querySelector('.main-sign-up');

const printSignUp = () => {
    btnSignUp.addEventListener('click', ()=> {
        signUpContainer.classList.add('signUp-active')
        loginContainer.classList.remove('login-active')
        localStorage.setItem("userCurrentState", "signUp");
    })
}

export default printSignUp;