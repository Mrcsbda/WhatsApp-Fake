import { getUsers } from "../../services/getUsers";
import postUser from "../../services/postUsers";
import loginValidationAlerts from "../signIn/loginValidationAlerts";

const registerUser = async (form, url) => {

    const inputName = form.querySelector('.name');
    const inputPhone = form.querySelector('.phone');
    const inputPassword = form.querySelector('.password');
    const inputImage = form.querySelector('.image');
    const inputInfo = form.querySelector('.info');



    if (inputName.value === "" || inputPhone.value === "" || inputPassword.value === "" || inputImage.value === "" || inputInfo.value === "") {
        loginValidationAlerts("emptyFields");
    } else {
        const user = {
            name: inputName.value,
            phone: inputPhone.value,
            password: inputPassword.value,
            Image: inputImage.value,
            lastTime: new Date().getTime(),
            isOnline: false,
            info: inputInfo.value
        }

        const existsNumber = await validationUser(inputPhone.value);

        if (!existsNumber) {
            postUser(url, user);
            loginValidationAlerts("successfulRegistration");
            form.reset()
        } else {
            loginValidationAlerts("existenPhone");
        }
    }



}

const validationUser = async (phoneUser) => {
    const data = await getUsers();
    const phoneFound = data.find(user => user.phone === phoneUser);
    if (!phoneFound) {
        return false;
    } else {
        return true;
    }
}

export default registerUser;