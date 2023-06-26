export const activeViews = () => {
    const userProfile = document.getElementById('userProfile')
    const closeUserProfileBtn = document.getElementById('closeProfile')
    const viewUserProfileBtn = document.getElementById('userProfilePicture') 

    const messagesSearch = document.querySelector('.main__messages-search-container')
    const messagesSearchBtn = document.querySelector('.main__chats-container__header--searcher-icon')
    const closeMessagesSearch = document.querySelector('.main__messages-search-container__header--close')
    

    viewUserProfileBtn.addEventListener('click', () => {
        userProfile.classList.add('active-view')
    })

    closeUserProfileBtn.addEventListener('click', () => {
        userProfile.classList.remove('active-view')
    })


    messagesSearchBtn.addEventListener('click', ()=> {
        messagesSearch.classList.add('active-view')
    })

    closeMessagesSearch.addEventListener('click', () => {
        messagesSearch.classList.remove('active-view')
    })
}