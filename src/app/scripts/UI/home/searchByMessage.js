import { getChats } from "../../services/getChats";

const inputSearch = document.getElementById('searchContact');

export const searchByMessages = async() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(!currentUser) return;
    const chats = await getChats()
    let filteredChats = []
    let messages = []
    const currentUserId = currentUser.id;

    filteredChats = chats.filter(chat => (chat.idUser1 === currentUserId) || (chat.idUser2 === currentUserId));
    filteredChats.forEach(chat => {
        chat.messages.forEach(message => {
            if(message.message.toLowerCase().includes(inputSearch.value.toLowerCase())) {
                    messages.push({
                        sendBy: message.sendBy,
                        received: chat.idUser1===message.sendBy?chat.idUser2:chat.idUser1,
                        message: message.message,
                        chatId: chat.id,
                    }) 
            }
        });
    })

    return messages
}

