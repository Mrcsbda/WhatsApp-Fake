import axios from "axios"
import { endpoints } from "./data"

const createNewChat = async (chat) => {
    try {
        const response = await axios.post(endpoints.urlChats, chat) 
    } catch (error) {
        console.log(error)
    }
}

export default createNewChat;