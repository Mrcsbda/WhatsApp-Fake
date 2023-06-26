import axios from "axios";
import { endpoints } from "./data";

const sendChatMessage = async (chatId, messages) => {
    try {
        const response = await axios.patch(`${endpoints.urlChats}/${chatId}`, {
            lastMessageSentAt: new Date().getTime(),
            messages: messages,
        }) 
    } catch (error) {
        console.log(error)
    }
}

export default sendChatMessage;