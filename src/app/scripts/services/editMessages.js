import axios from "axios";
import { endpoints } from "./data";

const editMessages = async (chatId, messages, isNew) => {
    try {

        const infoMessages = {
            lastMessageSentAt: new Date().getTime(),
            messages: messages,
        }
        
        if (!isNew) delete infoMessages.lastMessageSentAt;

        const response = await axios.patch(`${endpoints.urlChats}/${chatId}`, infoMessages) 
    } catch (error) {
        console.log(error)
    }
}

export default editMessages;