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

        console.log(chatMessagesSeparatedByDate)
        console.log(currentUser)
        chatMessagesSeparatedByDate.forEach(chat => {
            messagesContainer.innerHTML += `
            <div class="main__chats-container__messages-container__date">
             <p>${chat.day}</p>
            </div>
            `
            chat.messages.forEach(message => {
                messagesContainer.innerHTML += `
                <div class="${sendById(message.sendBy, currentUser)}">
                <p class="${sendById(message.sendBy, currentUser)}__message-container">

                    <span class="${sendById(message.sendBy, currentUser)}__message-container--message">${message.message}</span>
                    <span class="${sendById(message.sendBy, currentUser)}__message-container--hour">
                    ${new Date(message.hour).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                </p>
                <div></div>
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