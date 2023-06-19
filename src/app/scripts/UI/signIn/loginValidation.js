import Swal from "sweetalert2";
import { getUsers } from "../../services/getUsers"
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');
const form = document.getElementById('form');
const loginContainer = document.querySelector('.main-sign-in');
const homeContainer = document.querySelector('.main')

export const loginValidation = async () => {
    const data = await getUsers()
    console.log(data)
    form.addEventListener("submit", (event)=> {
        event.preventDefault() 
        const userFound = data.find(user => user.phone === userInput.value)
        if(userInput.value === "" || passwordInput.value === "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tienes campos sin rellenar',
              })
        } else if (!userFound) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario ingresado no existe',
              })
        } else if (passwordInput.value !== userFound.password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña incorrecta, vuelve a intentarlo',
              })
        } else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Bienvenido/a ${userFound.name}`,
                showConfirmButton: false,
                timer: 3000
              })
            loginContainer.classList.remove('login-active');
            homeContainer.classList.add('home-active');
            localStorage.setItem("userCurrentState","home");
            localStorage.setItem("currentUser",JSON.stringify(userFound));
        }
    })
}
