import createNewChat from "../../services/createNewChat";
import editMessages from "../../services/editMessages";
import { getChats } from "../../services/getChats";
import { editMessage } from "./editMessage";

const formMessage = document.getElementById("formMessage");
const sendMessageIcon = document.getElementById('sendMessageIcon');
const inputMessage = document.getElementById('inputMessage');
const editContainer = document.querySelector('.main__chats-container__footer__edit-message-container');

const sendMessage = () => {
    formMessage.addEventListener('submit', async (event) => {
        event.preventDefault();
        const infoChat = await getInfoChat();
        const messageToEditId = JSON.parse(localStorage.getItem('messageToEditId'));

        if(inputMessage.value === '') return

        if (messageToEditId) {
            const currentChat = await editMessage()
            editMessages(currentChat.id, currentChat.messages, false);
            closeViewActive()
            localStorage.removeItem('messageToEditId')
        } else if (infoChat.currentChat) {
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

const closeViewActive = () => {
    sendMessageIcon.setAttribute('src', 'https://www.svgrepo.com/show/505493/send-2.svg')
    sendMessageIcon.classList.remove('btn-edit-sucess')
    editContainer.classList.remove('edit-active-view')
}
export default sendMessage;