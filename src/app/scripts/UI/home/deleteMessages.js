import Swal from "sweetalert2"
import { getChats } from "../../services/getChats"
import editMessages from "../../services/editMessages";

const deleteMessage = async (messageId) => {
    const chats = await getChats();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentContatId = JSON.parse(localStorage.getItem('contactId'));
    const currentChat = chats.find(chat => 
        (chat.idUser1 === currentUser.id || chat.idUser2 === currentUser.id) &&
        (currentContatId === chat.idUser1 || currentContatId === chat.idUser2));
    const indexMessage = currentChat.messages.findIndex(message => message.id == messageId);
    currentChat.messages.splice(indexMessage,1);
    for(let i = indexMessage; i < currentChat.messages.length; i++) {
        currentChat.messages[i].id = i+1;
    }
    editMessages(currentChat.id, currentChat.messages, false)
}

export const getDeleteButtons = (buttons, options) => {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.getAttribute("data-id");
            const optionsContainer = Array.from(options)
            const optionContainer = optionsContainer.find(container => {
                const containerId = container.getAttribute("data-id");
                return containerId === buttonId;
            })
            optionContainer.classList.remove('active-view')
            alertDelete(buttonId)
        })
    })
}

const alertDelete = (buttonId) => {
    Swal.fire({
        title: 'Quieres eliminar este mensaje?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMessage(buttonId)
        }
      })
}