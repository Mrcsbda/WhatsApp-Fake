import editMessages from "../../services/editMessages";
import { getChats } from "../../services/getChats";
import { showEditOrDeleteBtns } from "./btnsEditAndDelete";
import { getDeleteButtons } from "./deleteMessages";
import { getEditButtons, } from "./editMessage";
const messagesContainer = document.getElementById('messagesContainer')
let chatMessagesSeparatedByDate = [];

const loadMessages = async (idChat) => {
    const chats = await getChats();
    const currentChat = chats.find(chat => chat.id == idChat);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    messagesContainer.innerHTML = "";
    chatMessagesSeparatedByDate = [];

    if (currentChat) {
        currentChat.messages.forEach((chatMessage) =>
            separateDatePerDay(chatMessage.date, chatMessage)
        );

        chatMessagesSeparatedByDate.forEach(chat => {
            messagesContainer.innerHTML += `
            <div class="main__chats-container__messages-container__date">
             <p>${chat.day}</p>
            </div>
            `
            chat.messages.forEach(message => {
                messagesContainer.innerHTML += `
                <div class="${sendById(message.sendBy, currentUser)}">
                <div class="${sendById(message.sendBy, currentUser)}__message-container ${isFocusMessage(message.id)}">
                    <p class="${sendById(message.sendBy, currentUser)}__message-container--message">${message.message}</p>
                    <div class="${sendById(message.sendBy, currentUser)}__message-container--check-and-hour">
                        <p class="${sendById(message.sendBy, currentUser)}__message-container--hour">
                         ${new Date(message.hour).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                        <img src="https://www.svgrepo.com/show/445629/check-all.svg" alt="icon check" 
                        class="${sendById(message.sendBy, currentUser)}__message-container--check ${message.isViewed?"viewed-chat":""}">
                    </div>
                    <button data-id="${message.id}" class="${sendById(message.sendBy, currentUser)}__message-container--edit-or-delete-btn">
                        <img src="https://www.svgrepo.com/show/511356/arrow-down-338.svg" alt="arrow icon">
                    </button>
                    <div data-id="${message.id}" class="${sendById(message.sendBy, currentUser)}__message-container--edit-or-delete">
                        <p data-id="${message.id}" class="${sendById(message.sendBy, currentUser)}__message-container-edit">Editar</p>
                        <p data-id="${message.id}" class="${sendById(message.sendBy, currentUser)}__message-container-delete" >Eliminar</p>
                    </div>
                </div>
                <div class="${sendById(message.sendBy, currentUser)}--rectangle ${sendById(message.sendBy, currentUser)}--rectangle-${isFocusMessage(message.id)} ${isFocusMessage(message.id)}-rectangle"></div>
                </div>
                
                `
            })
        })

        const btnEditOrDelete = document.querySelectorAll('.main__chats-container__messages-container__sender__message-container--edit-or-delete-btn');
        const optionsContainer = document.querySelectorAll('.main__chats-container__messages-container__sender__message-container--edit-or-delete');
        const deleteButtons = document.querySelectorAll('.main__chats-container__messages-container__sender__message-container-delete');
        const editButtons = document.querySelectorAll('.main__chats-container__messages-container__sender__message-container-edit');
        const focusMessageItem = document.querySelector('.focus-message')
        const focusMessageRectangule = document.querySelector('.focus-message-rectangle')

        focusMessage(focusMessageItem, focusMessageRectangule)
        showEditOrDeleteBtns(btnEditOrDelete, optionsContainer)
        getDeleteButtons(deleteButtons, optionsContainer)
        getEditButtons(editButtons, optionsContainer)
    }

    viewedMessage(currentChat, currentUser)
}

const separateDatePerDay = (date, message) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const sentDate = new Date(date).setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dayPreviousExists = chatMessagesSeparatedByDate.findIndex(
        (chatMessage) =>
            chatMessage.day ===
            getDayLabel(sentDate, today, yesterday)
    );

    if (dayPreviousExists === -1) {
        chatMessagesSeparatedByDate.push({
            day: getDayLabel(
                sentDate,
                today,
                yesterday
            ),
            messages: [],
        });
        dayPreviousExists = chatMessagesSeparatedByDate.length - 1;
    }

    chatMessagesSeparatedByDate[dayPreviousExists].messages.push(message);
}

const getDayLabel = (sentDate, today, yesterday) => {

    if (sentDate === today) return 'Hoy';
    if (sentDate === yesterday) {
        return 'Ayer';
    } else {
        return new Date(sentDate).toLocaleDateString();
    }

}

const sendById = (sendById, currentUser) => {

    if (sendById === currentUser.id) {
        return "main__chats-container__messages-container__sender"
    } else {
        return "main__chats-container__messages-container__receiver"
    }
}

const isFocusMessage = (messageId) => {
    const focusMessageId = Number(localStorage.getItem('idMessages'))
    if (!focusMessageId) return;
    return messageId===focusMessageId?"focus-message":""
}

const focusMessage = (focusMessageItem, focusMessageRectangule) => {
    if (focusMessageItem) {
        messagesContainer.focus();
        focusMessageItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            focusMessageItem.classList.remove('focus-message')
            focusMessageRectangule.classList.remove('main__chats-container__messages-container__sender--rectangle-focus-message')
            focusMessageRectangule.classList.remove('main__chats-container__messages-container__receiver--rectangle-focus-message')
            localStorage.removeItem('idMessages')
          }, "500");
    } else {
        messagesContainer.focus();
        const currentMessages = Array.from(messagesContainer.children)
        if(!currentMessages.length) return;
        currentMessages[currentMessages.length-1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

const viewedMessage = (currentChat, currentUser) => {
    if(!currentChat) return;
    if(!currentChat.messages.length) return;
    const viewedMessages = currentChat.messages.map(message => {
        if(message.sendBy !== currentUser.id && !message.isViewed) {
            message.isViewed = true;
        }
        return message
    })

    editMessages(currentChat.id, viewedMessages, false);
}

export default loadMessages