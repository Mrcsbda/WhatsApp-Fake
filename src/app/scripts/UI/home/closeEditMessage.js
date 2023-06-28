const inputMessage = document.getElementById('inputMessage');
const editContainer = document.querySelector('.main__chats-container__footer__edit-message-container');
const iconCloseEdit = document.querySelector('.main__chats-container__footer__edit-message-container--icon-close')
const sendMessageIcon = document.getElementById('sendMessageIcon');

export const closeEditContainer = () => {
    iconCloseEdit.addEventListener('click', () =>{
        sendMessageIcon.setAttribute('src','https://www.svgrepo.com/show/505493/send-2.svg')
        sendMessageIcon.classList.remove('btn-edit-sucess')
        editContainer.classList.remove('edit-active-view')
        inputMessage.value = ''
        localStorage.removeItem('messageToEditId')
    })
}