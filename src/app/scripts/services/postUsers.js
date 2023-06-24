import axios from 'axios';
import { endpoints } from './data';

const postUser = async (user) => {
    
    try {
        const response = await axios.post(endpoints.urlUsers, user);
        return response;
        
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default postUser;