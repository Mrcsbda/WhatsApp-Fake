import { getChats } from "../../services/getChats";
import loadMessages from "./loadMessages";
import printContactProfile from "./printProfileContact";

const loadLastMessage = async() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser) return;
    const idCurrentUser = currentUser.id;
    const chats =   await getChats();
    const orderChats = chats.sort((previous, current) => {
        return current.lastMessageSentAt - previous.lastMessageSentAt
    }).filter(chat => chat.idUser1 === idCurrentUser || chat.idUser2 === idCurrentUser);

    if(orderChats[0].idUser1 !== idCurrentUser) {
        printContactProfile(orderChats[0].idUser1)
    } else {
        printContactProfile(orderChats[0].idUser2)
    }
    loadMessages(orderChats[0].id)  
}

export default loadLastMessage;