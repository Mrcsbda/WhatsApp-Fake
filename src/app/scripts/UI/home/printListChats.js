import { getChats } from "../../services/getChats"
import { getUsers } from "../../services/getUsers"
import loadMessages from "./loadMessages"
import printContactProfile from "./printProfileContact"
import { searchByMessages } from "./searchByMessage";

const inputSearch = document.getElementById('searchContact');
const activeChat = document.querySelector('.main__chats-container');
const listChatsContainer = document.getElementById('listChatsContainer');
const editContainer = document.querySelector('.main__chats-container__footer__edit-message-container');
const sendMessageIcon = document.getElementById('sendMessageIcon');


const printListChats = async (infoFiltered = null) => {
    const users = await getUsers()
    const chats = await getChats()
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let dataUsers = {}
    let dataUsersWithChats = '';

    if (infoFiltered && infoFiltered.length !== 0) {
        dataUsers = {
            users: infoFiltered,
            chats,
            currentUser
        }
        dataUsersWithChats = getChatsByUser(dataUsers)
        renderChats(dataUsersWithChats, currentUser)
    } else if (infoFiltered && infoFiltered.length === 0) {
        const filteredMessages = await searchByMessages();
        renderChatsByMessages(filteredMessages, users)
    } else {
        dataUsers = {
            users,
            chats,
            currentUser
        }
        dataUsersWithChats = getChatsByUser(dataUsers)
        renderChats(dataUsersWithChats, currentUser)
    }


}

const getChatsByUser = ({ users, chats, currentUser }) => {
    if (!currentUser) return [];
    return users.map((dataUser) => {
        return {
            dataUser,
            dataChat: chats.find(chat =>
                (chat.idUser1 === dataUser.id || chat.idUser2 === dataUser.id) &&
                (currentUser.id === chat.idUser1 || currentUser.id === chat.idUser2))
        }
    }).filter(data => data.dataUser.id !== currentUser.id).sort((previous, current) => {
        if (!previous.dataChat || !current.dataChat) {
            if (!previous.dataChat && !current.dataChat) return 0; // Ambos tienen lastMessageSentAt indefinido
            if (!previous.dataChat) return 1; // previous tiene lastMessageSentAt indefinido
            if (!current.dataChat) return -1; // current tiene lastMessageSentAt indefinido
        }
        return current.dataChat.lastMessageSentAt - previous.dataChat.lastMessageSentAt;
    })
}

const getLastTimeMessage = (dataChat) => {
    if (!dataChat || !dataChat.messages.length) return ""
    const today = new Date().setHours(0, 0, 0, 0);
    const sentDate = new Date(dataChat.messages[dataChat.messages.length - 1].hour).setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (sentDate === today) {
        return "Hoy"
    } else if (sentDate === yesterday) {
        return "Ayer"
    } else {
        return new Date(sentDate).toLocaleDateString();
    }
}

const getLastMessage = (dataChat) => {

    return !dataChat || !dataChat.messages.length ? " " : dataChat.messages[dataChat.messages.length - 1].message;
}

const showCurrentChat = (currentChat, boolean) => {
    currentChat.addEventListener('click', () => {
        const userId = currentChat.getAttribute("user-id");
        const chatId = currentChat.getAttribute("chat-id");
        activeChat.classList.add('active-view')
        localStorage.setItem('contactId', userId)
        if (boolean) {
            loadMessages(chatId)
            const messageId = currentChat.querySelector('.main__left-side__chats-container__chats__contact-chat__conversation-container__conversation--message')
                .getAttribute("message-id");
            localStorage.setItem('idMessages', messageId)
        } else {
            loadMessages(chatId)
        }
        printContactProfile()
        closeViewActive()
        printListChats()
        inputSearch.value = ''
    })

}

export const closeViewActive = () => {
    const contactProfile = document.querySelector('.main__profie-contact-container')
    const userProfile = document.getElementById('userProfile')
    const messagesSearch = document.querySelector('.main__messages-search-container')
    contactProfile.classList.remove('active-view');
    sendMessageIcon.setAttribute('src', 'https://www.svgrepo.com/show/505493/send-2.svg')
    sendMessageIcon.classList.remove('btn-edit-sucess')
    editContainer.classList.remove('edit-active-view')
    userProfile.classList.remove('active-view')
    messagesSearch.classList.remove('active-view')
}

const renderChats = (array, currentUser) => {
    listChatsContainer.innerHTML = "";
    array.forEach(user => {
        listChatsContainer.innerHTML += `
        <div class="main__left-side__chats-container__chats__contact-chat" user-id="${user.dataUser.id}" chat-id="${!user.dataChat ? 0 : user.dataChat.id}">
            <img class="main__left-side__chats-container__chats__contact-chat--profile-picture"
                    src="${user.dataUser.image}" alt="">
            <div class="main__left-side__chats-container__chats__contact-chat__conversation-container">
                <p
                        class="main__left-side__chats-container__chats__contact-chat__conversation-container__information">
                        <span
                            class="main__left-side__chats-container__chats__contact-chat__conversation-container__information--name">${user.dataUser.name}</span>
                        <span
                            class="main__left-side__chats-container__chats__contact-chat__conversation-container__information--date">
                            ${getLastTimeMessage(user.dataChat)}</span>
                </p>
                <p
                        class="main__left-side__chats-container__chats__contact-chat__conversation-container__conversation">
                        <img class="${hiddenIconChecked(user.dataChat, currentUser)
                            ? "inactive-icon" : showIconChecked(user.dataChat.messages[user.dataChat.messages.length-1].isViewed)} "
                            src="https://www.svgrepo.com/show/445629/check-all.svg" alt="viewed icon">
                        <span
                                class="main__left-side__chats-container__chats__contact-chat__conversation-container__conversation--message">
                                ${getLastMessage(user.dataChat)}</span>
                </p>
            </div>
        </div>
        `
    })

    const listChats = document.querySelectorAll('.main__left-side__chats-container__chats__contact-chat')
    listChats.forEach(chat => {
        showCurrentChat(chat, false);
    })
}

const renderChatsByMessages = (filteredMessages, users) => {
    listChatsContainer.innerHTML = "";
    const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    filteredMessages.forEach(message => {
        listChatsContainer.innerHTML += `
        <div class="main__left-side__chats-container__chats__contact-chat" user-id="${message.sendBy === currentUserId ? message.received : message.sendBy}" chat-id="${message.chatId}">
            <div class="main__left-side__chats-container__chats__contact-chat__conversation-container">
                <p
                        class="main__left-side__chats-container__chats__contact-chat__conversation-container__information">
                        <span
                            class="main__left-side__chats-container__chats__contact-chat__conversation-container__information--name">${validationUser(message.sendBy, currentUserId, users)}</span>
                </p>
                <p
                        class="main__left-side__chats-container__chats__contact-chat__conversation-container__conversation">
                        <img class="inactive-icon main__left-side__chats-container__chats__contact-chat__conversation-container__conversation--viewed-icon"
                            src="https://www.svgrepo.com/show/445629/check-all.svg" alt="viewed icon">
                        <span
                                class="main__left-side__chats-container__chats__contact-chat__conversation-container__conversation--message" message-id="${message.id}">
                                ${message.message}</span>
                </p>
            </div>
        </div>
        `
    })

    const listChats = document.querySelectorAll('.main__left-side__chats-container__chats__contact-chat')
    listChats.forEach(chat => {
        showCurrentChat(chat, true);
    })
}

const validationUser = (messageSendBy, currentUserId, users) => {
    return messageSendBy === currentUserId ? "Tú" : users.find(user => user.id === messageSendBy).name
}

const showIconChecked = (isViewed) => {

    if(isViewed) {
        return "main__left-side__chats-container__chats__contact-chat__conversation-container__conversation--viewed-icon viewed-chat"
    } else {
        return "main__left-side__chats-container__chats__contact-chat__conversation-container__conversation--viewed-icon"
    }

}

const hiddenIconChecked = (dataChat, currentUser) => {
 return !dataChat || !dataChat.messages.length || currentUser.id !== dataChat.messages[dataChat.messages.length-1].sendBy
}

export default printListChats;
