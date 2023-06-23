import axios from 'axios';

const postUser = async (url, user) => {
    
    try {
        const response = await axios.post(url, user);
        return response;
        
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default postUser;