import editProfile from "../../services/editProfile";
import { getUsers } from "../../services/getUsers";
import validationAlerts from "../validationAlerts";
import printInfoUsers from "./printInfoUsers";

const editInfoUser = async (input, id, type) => {

    let user = {}
    if (input === '') {
        console.log('campo vacio')
        validationAlerts('emptyFields')
    } else {
        if (type === 'image') {
            user = {
                image: input
            }
        } else if (type === 'name') {
            user = {
                name: input
            }
        } else {
            user = {
                info: input
            }
        }
    }
    
    await editProfile(id, user);
    const data = await getUsers();
    const filtro = data.find(user => user.id === Number(id));

    if (filtro) {
        localStorage.setItem("currentUser", JSON.stringify(filtro));
        printInfoUsers();
    }

    
}

export default editInfoUser;