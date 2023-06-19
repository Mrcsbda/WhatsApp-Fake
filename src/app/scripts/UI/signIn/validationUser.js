import Swal from "sweetalert2";
import { getUsers } from "../../services/getUsers"
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');
const form = document.getElementById('form');

export const loginValidation = async () => {
    const data = await getUsers()
    console.log(data)
    form.addEventListener("submit", (event)=> {
        event.preventDefault() 
        const userFound = data.filter(user => user.phone === userInput.value)
 
        if(userInput.value === "" || passwordInput.value === "" ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tienes campos sin rellenar',
              })
        } else if (!userFound.length) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario ingresado no existe',
              })
        } else if (passwordInput.value ==! userFound[0].password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña incorrecta, vuelve a intentarlo',
              })
        } else {
            
        }



    })
}
const formValidation = () => {

}