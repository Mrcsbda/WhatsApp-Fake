const btnSignOff = document.getElementById('btnSignOff');

const signOff = (homeContainer, loginContainer) => {
    btnSignOff.addEventListener('click', ()=> {
        homeContainer.classList.remove('home-active');
        loginContainer.classList.add('login-active');
        localStorage.removeItem("userCurrentState");
        localStorage.removeItem("currentUser");
    })
}

export default signOff;