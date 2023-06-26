import createNewChat from "../../services/createNewChat";
import { getChats } from "../../services/getChats";
import sendChatMessage from "../../services/sendChatMessage";

const sendMessageIcon = document.getElementById('sendMessageIcon');
const inputMessage = document.getElementById('inputMessage');

const sendMessage = () => {
    sendMessageIcon.addEventListener('click', async () => {
        const infoChat = await getInfoChat();
        console.log(infoChat)
        if(inputMessage.value === '') return
        if (infoChat.currentChat) {
            const allMessages = infoChat.currentChat.messages;
            allMessages.push(infoChat.newMessage);
            sendChatMessage(infoChat.currentChat.id, allMessages);
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