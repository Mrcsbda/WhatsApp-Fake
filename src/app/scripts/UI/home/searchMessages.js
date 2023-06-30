const messagesSearch = document.querySelector('.main__messages-search-container')
const messagesSearchBtn = document.querySelector('.main__chats-container__header--searcher-icon')


export const searchMessages = () => {

    
    const closeMessagesSearch = document.querySelector('.main__messages-search-container__header--close')
    showMessages(closeMessagesSearch)
}

const showMessages = (closeMessagesSearch) => {
    messagesSearchBtn.addEventListener('click', () => {
        messagesSearch.classList.add('active-view')
    })

    closeMessagesSearch.addEventListener('click', () => {
        messagesSearch.classList.remove('active-view')
    })
}