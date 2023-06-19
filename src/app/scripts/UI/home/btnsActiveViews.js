export const activeViews = () => {
    const userProfile = document.getElementById('userProfile')
    const closeUserProfileBtn = document.getElementById('closeProfile')
    const viewUserProfileBtn = document.getElementById('userProfilePicture') 

    const activeChat = document.querySelector('.main__chats-container')
    const closeChatBtn = document.querySelector('.main__chats-container__header__contact--return')
    const listChats = document.querySelectorAll('.main__left-side__chats-container__chats__contact-chat')

    const contactProfile = document.querySelector('.main__profie-contact-container')
    const closeContactProfileBtn = contactProfile.querySelector('.main__profie-contact-container__header--icon')
    const viewContactProfileBtn = document.querySelector('.main__chats-container__header__contact--profile-picture')

    const messagesSearch = document.querySelector('.main__messages-search-container')
    const messagesSearchBtn = document.querySelector('.main__chats-container__header--searcher-icon')
    const closeMessagesSearch = document.querySelector('.main__messages-search-container__header--close')
    
    

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