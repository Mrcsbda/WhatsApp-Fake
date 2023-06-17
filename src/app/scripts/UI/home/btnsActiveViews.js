export const activeViews = () => {
    const userProfile = document.getElementById('userProfile')
    const viewUserProfileBtn = document.getElementById('userProfilePicture') 
    const closeUserProfileBtn = document.getElementById('closeProfile')
    const listChats = document.querySelectorAll('.main__left-side__chats-container__chats__contact-chat')
    const activeChat = document.querySelector('.main__chats-container')
    const closeChatBtn = activeChat.querySelector('.main__chats-container__header__contact--return')
    const viewContactProfileBtn = activeChat.querySelector('.main__chats-container__header__contact--profile-picture')
    const messagesSearchBtn = activeChat.querySelector('.main__chats-container__header--searcher-icon')
    const messagesSearch = document.querySelector('.main__messages-search-container')
    const closeMessagesSearch = messagesSearch.querySelector('.main__messages-search-container__header--close')
    const contactProfile = document.querySelector('.main__profie-contact-container')
    const closeContactProfileBtn = contactProfile.querySelector('.main__profie-contact-container__header--icon')

    viewUserProfileBtn.addEventListener('click', () => {
        userProfile.classList.add('active-view')
    })

    closeUserProfileBtn.addEventListener('click', () => {
        userProfile.classList.remove('active-view')
    })

    listChats.forEach(chat => {
        chat.addEventListener('click', () => {
            activeChat.classList.add('active-view')
        })
    })

    closeChatBtn.addEventListener('click', () => {
        activeChat.classList.remove('active-view')
    })

    viewContactProfileBtn.addEventListener('click', () =>{
        contactProfile.classList.add('active-view')
    })

    closeContactProfileBtn.addEventListener('click', () => {
        contactProfile.classList.remove('active-view')
    })

    messagesSearchBtn.addEventListener('click', ()=> {
        messagesSearch.classList.add('active-view')
    })

    closeMessagesSearch.addEventListener('click', () => {
        messagesSearch.classList.remove('active-view')
    })
}