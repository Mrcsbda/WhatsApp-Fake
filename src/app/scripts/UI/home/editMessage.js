import { getChats } from "../../services/getChats";

const editContainer = document.querySelector('.main__chats-container__footer__edit-message-container');
const sendMessageIcon = document.getElementById('sendMessageIcon');
const messageContainer = document.querySelector('.main__chats-container__footer__edit-message-container__text-container--message')
const inputMessage = document.getElementById('inputMessage');

export const editMessage = async() => {
    const messageId = JSON.parse(localStorage.getItem('messageToEditId'))
    const currentChat = await getCurrentChat();
    currentChat.messages[messageId-1].message = inputMessage.value;
    inputMessage.value = '';
    return currentChat;
}

export const getEditButtons = (buttons, options) => {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.getAttribute("data-id");
            const optionsContainer = Array.from(options)
            const optionContainer = optionsContainer.find(container => {
                const containerId = container.getAttribute("data-id");
                return containerId === buttonId;
            })
            showMessageToEdit(optionContainer,buttonId)
        })
    })
}

const showMessageToEdit = async (optionContainer, messageId) => {
    optionContainer.classList.remove('active-view')
    sendMessageIcon.setAttribute('src','https://www.svgrepo.com/show/404946/check-mark-button.svg')
    sendMessageIcon.classList.add('btn-edit-sucess')
    editContainer.classList.add('edit-active-view')
    const currentChat = await getCurrentChat(messageId);
    const message = currentChat.messages.find(message => message.id == messageId);
    messageContainer.innerHTML = message.message;
    inputMessage.value = message.message;
    localStorage.setItem('messageToEditId', messageId);
}

const getCurrentChat = async () => {
    const chats = await getChats();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentContatId = JSON.parse(localStorage.getItem('contactId'));
    const currentChat = chats.find(chat => 
        (chat.idUser1 === currentUser.id || chat.idUser2 === currentUser.id) &&
        (currentContatId === chat.idUser1 || currentContatId === chat.idUser2));
    return currentChat;
}