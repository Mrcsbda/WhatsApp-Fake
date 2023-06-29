import axios from "axios";
import { endpoints } from "./data";

const editProfile = async (id, user) => {

    try {
        const editUser = `${endpoints.urlUsers}/${id}`;
        const response = await axios.patch(editUser, user);
        return response;
        
    } catch (error) {
        console.log(error)
        return error;
    }
}

export default editProfile;