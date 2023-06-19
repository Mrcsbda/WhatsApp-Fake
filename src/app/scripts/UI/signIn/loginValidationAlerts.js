import Swal from "sweetalert2";

const loginValidationAlerts = (alertType, userFound = null) => {
    switch (alertType) {
        case "emptyFields": Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tienes campos sin rellenar',
        })
            break;
        case "nonExistentUser": Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario ingresado no existe',
        })
            break;
        case "incorrectPassword": Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña incorrecta, vuelve a intentarlo',
        })
            break;
        default: Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Bienvenido/a ${userFound.name}`,
            showConfirmButton: false,
            timer: 3000
        })
            break;
    }
}

export default loginValidationAlerts