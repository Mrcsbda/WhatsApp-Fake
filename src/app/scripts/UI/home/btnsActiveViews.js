export const activeViews = () => {
     
    const messagesSearch = document.querySelector('.main__messages-search-container')
    const messagesSearchBtn = document.querySelector('.main__chats-container__header--searcher-icon')
    const closeMessagesSearch = document.querySelector('.main__messages-search-container__header--close')


    messagesSearchBtn.addEventListener('click', ()=> {
        messagesSearch.classList.add('active-view')
    })

    closeMessagesSearch.addEventListener('click', () => {
        messagesSearch.classList.remove('active-view')
    })
}