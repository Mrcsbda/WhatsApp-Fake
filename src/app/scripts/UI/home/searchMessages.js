import { getChats } from "../../services/getChats"
import { getDayLabel } from "./loadMessages"

const messagesSearch = document.querySelector('.main__messages-search-container')
const messagesSearchBtn = document.querySelector('.main__chats-container__header--searcher-icon')
const closeMessagesSearch = document.querySelector('.main__messages-search-container__header--close')
const messagesContainer = document.querySelector('.main__messages-search-container__leaked-messages')

export const searchMessages = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(!currentUser) return;
    const chats = await getChats()
    const contactId = Number(localStorage.getItem('contactId'))
    const currentChat = chats.find(chat =>
        (chat.idUser1 === +currentUser.id || chat.idUser2 === +currentUser.id) &&
        (chat.idUser1 === contactId || chat.idUser2 === contactId))

    renderMessages(currentChat)
    showMessages()
}

const showMessages = () => {
    messagesSearchBtn.addEventListener('click', () => {
        messagesSearch.classList.add('active-view')
    })

    closeMessagesSearch.addEventListener('click', () => {
        messagesSearch.classList.remove('active-view')
    })
}

const renderMessages = (currentChat) => {
    const today = new Date().setHours(0, 0, 0, 0);

    messagesContainer.innerHTML = '';
    currentChat.messages.reverse().forEach(message => {
        messagesContainer.innerHTML += `
        <div class="main__messages-search-container__leaked-messages__messages" message-id="${message.id}">
                <p class="main__messages-search-container__leaked-messages__messages--date">${getDayLabel(new Date(message.date).setHours(0, 0, 0, 0), today)}</p>
                <div class="main__messages-search-container__leaked-messages__messages--info">
                    <p>${message.message}</p>
                </div>
        </div>
        `
    })
}

