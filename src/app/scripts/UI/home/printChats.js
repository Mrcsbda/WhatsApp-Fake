import { getChats } from "../../services/getChats"
import { getUsers } from "../../services/getUsers"
import loadMessages from "./loadMessages"
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

    listChatsContainer.innerHTML = "";
    console.log(dataUsersWithChats)
    dataUsersWithChats.forEach(user => {

        listChatsContainer.innerHTML += `
        <div class="main__left-side__chats-container__chats__contact-chat" user-id="${user.dataUser.id}" chat-id="${!user.dataChat?0:user.dataChat.id}">
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
                        <img class="${!user.dataChat?"inactive-icon":"main__left-side__chats-container__chats__contact-chat__conversation-container__conversation--viewed-icon"}"
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
        chat.addEventListener('click', () => {
            const userId = chat.getAttribute("user-id");
            const chatId = chat.getAttribute("chat-id")
            activeChat.classList.add('active-view')
            loadMessages()
        })
    })
}

const getChatsByUser = ({users, chats, currentUser}) => {
    return users.map((dataUser) => {
        return {
            dataUser,
            dataChat: chats.find(chat => chat.idUser1 === dataUser.id || chat.idUser2 === dataUser.id)
        }
    }).filter(data => data.dataUser.id !== currentUser.id)
}

const getLastTimeMessage = (dataChat) => {
    return !dataChat?"":new Date(dataChat.messages[dataChat.messages.length-1].hour).toLocaleString("es").split(",")[0]
}

const getLastMessage = (dataChat) => {
    return !dataChat?" ":dataChat.messages[dataChat.messages.length-1].message;
}

export default printChats;