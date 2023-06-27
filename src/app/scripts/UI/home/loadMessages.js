import { getChats } from "../../services/getChats";
const messagesContainer = document.getElementById('messagesContainer')
let chatMessagesSeparatedByDate = [];


const loadMessages = async (idChat) => {
    const chats = await getChats();
    const currentChat = chats.find(chat => chat.id == idChat);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    messagesContainer.innerHTML = "";
    chatMessagesSeparatedByDate = [];

    if (currentChat) {
        currentChat.messages.forEach((chatMessage) =>
            separateDatePerDay(chatMessage.date, chatMessage)
        );

        chatMessagesSeparatedByDate.forEach(chat => {
            messagesContainer.innerHTML += `
            <div class="main__chats-container__messages-container__date">
             <p>${chat.day}</p>
            </div>
            `
            chat.messages.forEach(message => {
                messagesContainer.innerHTML += `
                <div class="${sendById(message.sendBy, currentUser)}">
                <div class="${sendById(message.sendBy, currentUser)}__message-container">
                    <p class="${sendById(message.sendBy, currentUser)}__message-container--message">${message.message}</p>
                    <p class="${sendById(message.sendBy, currentUser)}__message-container--hour">
                    ${new Date(message.hour).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    <button class="${sendById(message.sendBy, currentUser)}__message-container--edit-or-delete-btn">
                        <img src="https://www.svgrepo.com/show/511356/arrow-down-338.svg" alt="arrow icon">
                    </button>
                    <div class="${sendById(message.sendBy, currentUser)}__message-container--edit-or-delete">
                        <img src="https://www.svgrepo.com/show/438388/close.svg" alt="">
                        <p>Editar</p>
                        <p>Eliminar</p>
                    </div>
                </div>
                <div class="${sendById(message.sendBy, currentUser)}--rectangle"></div>
                </div>
                
                `
            })
        })

    }
}

const separateDatePerDay = (date, message) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const sentDate = new Date(date).setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dayPreviousExists = chatMessagesSeparatedByDate.findIndex(
        (chatMessage) =>
            chatMessage.day ===
            getDateLabelDependingOnDateWereMessageWasSent(sentDate, today, yesterday)
    );

    if (dayPreviousExists === -1) {
        chatMessagesSeparatedByDate.push({
            day: getDateLabelDependingOnDateWereMessageWasSent(
                sentDate,
                today,
                yesterday
            ),
            messages: [],
        });
        dayPreviousExists = chatMessagesSeparatedByDate.length - 1;
    }

    chatMessagesSeparatedByDate[dayPreviousExists].messages.push(message);
}

const getDateLabelDependingOnDateWereMessageWasSent = (sentDate, today, yesterday) => {

    if (sentDate === today) return 'Hoy';
    if (sentDate === yesterday) {
        return 'Ayer';
    } else {
        return new Date(sentDate).toLocaleDateString();
    }

}

const sendById = (sendById, currentUser) => {

    if (sendById === currentUser.id) {
        return "main__chats-container__messages-container__sender"
    } else {
        return "main__chats-container__messages-container__receiver"
    }
}

export default loadMessages