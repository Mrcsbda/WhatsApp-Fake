const editContainer = document.querySelector('.main__chats-container__footer__edit-message-container');
const sendMessageIcon = document.getElementById('sendMessageIcon');
const atrributeSrc = sendMessageIcon.getAttribute('src');

export const editMessages = () => {
    
}

export const getEditButtons = (buttons, options) => {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.getAttribute("data-id");
            const optionsContainer = Array.from(options)
            const optionContainer = optionsContainer.find(container => {
                const containerId = container.getAttribute("data-id");
                return containerId === buttonId;
            })
            optionContainer.classList.remove('active-view')
            sendMessageIcon.setAttribute('src','https://www.svgrepo.com/show/404946/check-mark-button.svg')
            sendMessageIcon.classList.add('btn-edit-sucess')
            editContainer.classList.add('edit-active-view')
            return buttonId;
        })
    })
}