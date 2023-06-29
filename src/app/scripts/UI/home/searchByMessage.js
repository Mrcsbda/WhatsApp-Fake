import { getChats } from "../../services/getChats";

const inputSearch = document.getElementById('searchContact');

export const searchByMessages = async() => {
    const chats = await getChats()
    let filteredChats = []
    let filteredMessages = []
    let messages = {}
    const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;

    inputSearch.addEventListener('keydown', debounce(() => {
        filteredChats = chats.filter(chat => (chat.idUser1 === currentUserId) || (chat.idUser2 === currentUserId));
        filteredMessages = filteredChats.filter(chat => {
            chat.messages.forEach(message => {
                if(message.message.includes(inputSearch.value)) {
                    return messages = {
                        sendBy: message.sendBy,
                        message: message.message,
                    }
                }
            });
        })
        console.log('mensajes filtrados')
        console.log(filteredMessages)
      }, 1000))

      
}

const debounce = (callback, wait) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

