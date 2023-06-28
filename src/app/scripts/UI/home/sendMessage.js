import createNewChat from "../../services/createNewChat";
import editMessages from "../../services/editMessages";
import { getChats } from "../../services/getChats";

const sendMessageIcon = document.getElementById('sendMessageIcon');
const inputMessage = document.getElementById('inputMessage');

const sendMessage = () => {
    sendMessageIcon.addEventListener('click', async () => {
        const infoChat = await getInfoChat();

        if(inputMessage.value === '') return
        if (infoChat.currentChat) {
            const allMessages = infoChat.currentChat.messages;
            allMessages.push(infoChat.newMessage);
            editMessages(infoChat.currentChat.id, allMessages, true);
            inputMessage.value = '';
        } else {
            createNewChat(infoChat.newChat)
            inputMessage.value = '';
        }
    })
}

const getInfoChat = async () => {
    const chats = await getChats();
    const currentDay = new Date().getTime();
    const idCurrentUser = JSON.parse(localStorage.getItem('currentUser')).id;
    const idContact = +localStorage.getItem('contactId');
    const currentChat = chats.find(chat =>
        (chat.idUser1 === idCurrentUser || chat.idUser2 === idCurrentUser) &&
        (idContact === chat.idUser1 || idContact === chat.idUser2))
    const newMessage = {
        id: currentChat ? currentChat.messages.length + 1 : 1,
        sendBy: idCurrentUser,
        message: inputMessage.value,
        date: currentDay,
        hour: currentDay,
        isViewed: false,
    }

    const newChat = {
        idUser1: idCurrentUser,
        idUser2: idContact,
        lastMessageSentAt: currentDay,
        messages: [newMessage]
    }

    return {
        currentChat,
        newChat,
        newMessage
    }

}
export default sendMessage;