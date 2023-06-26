import { getChats } from "../../services/getChats"
import { getUsers } from "../../services/getUsers"
import loadMessages from "./loadMessages"
import printContactProfile from "./printProfileContact"
const activeChat = document.querySelector('.main__chats-container')
const listChatsContainer = document.getElementById('listChatsContainer')

const printChats = async () => {
    const users = await getUsers()
    const chats = await getChats()
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const data = {
        users,
        chats,
        currentUser
    }
    const dataUsersWithChats = getChatsByUser(data)
    console.log(dataUsersWithChats)
    listChatsContainer.innerHTML = "";
    dataUsersWithChats.forEach(user => {

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
                        <img class="${!user.dataChat ? "inactive-icon" : "main__left-side__chats-container__chats__contact-chat__conversation-container__conversation--viewed-icon"}"
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
        showCurrentChat(chat);
    })
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
    if (!dataChat) return ""
    const today = new Date().setHours(0, 0, 0, 0);
    const sentDate = new Date(dataChat.messages[dataChat.messages.length - 1].hour).setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (!dataChat) {
        return ""
    } else if (sentDate === today) {
        return "Hoy"
    } else if (sentDate === yesterday) {
        return "Ayer"
    } else {
        return new Date(sentDate).toLocaleDateString();
    }
}

const getLastMessage = (dataChat) => {
    return !dataChat ? " " : dataChat.messages[dataChat.messages.length - 1].message;
}

const showCurrentChat = (currentChat) => {
    currentChat.addEventListener('click', () => {
        const userId = currentChat.getAttribute("user-id");
        const chatId = currentChat.getAttribute("chat-id")
        activeChat.classList.add('active-view')
        localStorage.setItem('contactId', userId)
        loadMessages(chatId)
        printContactProfile()
        closeViewActives()
    })
}

const closeViewActives = () => {
    const contactProfile = document.querySelector('.main__profie-contact-container')
    contactProfile.classList.remove('active-view');
}

export default printChats;