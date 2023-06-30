import { getChats } from "../../services/getChats"
import loadMessages, { getDayLabel } from "./loadMessages"
import { debounce } from "./searchContact"

const messagesSearch = document.querySelector('.main__messages-search-container')
const messagesSearchBtn = document.querySelector('.main__chats-container__header--searcher-icon')
const closeMessagesSearch = document.querySelector('.main__messages-search-container__header--close')
const messagesContainer = document.querySelector('.main__messages-search-container__leaked-messages')
const searchMessage = document.getElementById('searchMessage')

export const searchMessages = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (!currentUser) return;
    const currentChat = await getCurrentChat(currentUser)
    renderMessages(currentChat.messages)
    showMessages()
    searchMessage.addEventListener('keydown', debounce(() => {
        let filteredMessages = currentChat.messages.filter(message =>
            message.message.toLowerCase().includes(searchMessage.value.toLowerCase()))
        renderMessages(filteredMessages.reverse(), currentChat.id)
        filteredMessages = [];
    }, 1000))
}

const showMessages = () => {
    messagesSearchBtn.addEventListener('click', () => {
        messagesSearch.classList.add('active-view')
    })

    closeMessagesSearch.addEventListener('click', () => {
        messagesSearch.classList.remove('active-view')
    })
}

const renderMessages = (messages) => {
    const today = new Date().setHours(0, 0, 0, 0);

    messagesContainer.innerHTML = '';
    messages.reverse().forEach(message => {
        messagesContainer.innerHTML += `
        <div class="main__messages-search-container__leaked-messages__messages" message-id="${message.id}">
                <p class="main__messages-search-container__leaked-messages__messages--date">${getDayLabel(new Date(message.date).setHours(0, 0, 0, 0), today)}</p>
                <div class="main__messages-search-container__leaked-messages__messages--info">
                    <p>${message.message}</p>
                </div>
        </div>
        `
    })

    const messagesFilteredContainer = document.querySelectorAll('.main__messages-search-container__leaked-messages__messages');
    focusSelectedMessage(messagesFilteredContainer)
}

const focusSelectedMessage = (messagesFilteredContainer) => {
    messagesFilteredContainer.forEach(message => {
        message.addEventListener('click', async () => {
            const messageId = message.getAttribute("message-id");
            localStorage.setItem('idMessages', messageId)
            messagesSearch.classList.remove('active-view')
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            const currentChat = await getCurrentChat(currentUser)
            searchMessage.value = '';
            loadMessages(currentChat.id)
            renderMessages(currentChat.messages)
        })
    })
}

const getCurrentChat = async (currentUser) => {
    const chats = await getChats()
    const contactId = Number(localStorage.getItem('contactId'))
    const currentChat = chats.find(chat =>
        (chat.idUser1 === +currentUser.id || chat.idUser2 === +currentUser.id) &&
        (chat.idUser1 === contactId || chat.idUser2 === contactId))
    return currentChat
}