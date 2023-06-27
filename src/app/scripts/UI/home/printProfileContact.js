import { getUsers } from "../../services/getUsers";

const contactProfile = document.querySelector('.main__profie-contact-container')
const headerChat = document.querySelector('.main__chats-container__header__contact');
const activeChat = document.querySelector('.main__chats-container');

const printContactProfile = async (id=null) => {
    const contactId = localStorage.getItem('contactId');
    const data = await getUsers()
    let contactData = []
    if (id) {
        contactData = data.find(user => user.id === id);
    } else {
        contactData = data.find(user => user.id === +contactId);
    }
     
    contactProfile.innerHTML = `
        <section class="main__profie-contact-container__header">
            <img src="https://www.svgrepo.com/show/511383/arrow-left-350.svg" alt="return chat icon"
                class="main__profie-contact-container__header--icon">
            <p class="main__profie-contact-container__header--title">Info. del contacto</p>
        </section>
        <figure class="main__profie-contact-container__profile-picture">   
        <img class="main__profie-contact-container__profile-picture--img"
                src="${contactData.image}" alt="${contactData.name}'s picture">
        </figure>
        <section class="main__profie-contact-container__info-contact">
        <p class="main__profie-contact-container__info-contact--name">${contactData.name}</p>
        <p class="main__profie-contact-container__info-contact--number">${contactData.phone}</p>
        </section>
        <section class="main__profie-contact-container__status">
            <p class="main__profie-contact-container__status--text">${contactData.info}</p>
        </section>
    `

    headerChat.innerHTML = `
        <img src="https://www.svgrepo.com/show/511383/arrow-left-350.svg" class="main__chats-container__header__contact--return">
        <img src="${contactData.image}" alt="profile picture " class="main__chats-container__header__contact--profile-picture">
        <p class="main__chats-container__header__contact__name-and-last-seen">
                <span class="main__chats-container__header__contact__name-and-last-seen--name">${contactData.name}</span>
                <span class="main__chats-container__header__contact__name-and-last-seen--last-seen">${showLastTime(contactData)}</span>
        </p>
    `

    const viewContactProfileBtn = document.querySelector('.main__chats-container__header__contact--profile-picture')
    const closeContactProfileBtn = document.querySelector('.main__profie-contact-container__header--icon')
    const closeChatBtn = document.querySelector('.main__chats-container__header__contact--return')
    showContactProfile(viewContactProfileBtn)
    closeContactProfile(closeContactProfileBtn)
    closeCurrentChat(closeChatBtn)
}

const showContactProfile = (btn) => {
    btn.addEventListener('click', () =>{
        contactProfile.classList.add('active-view')
    })
}

const closeContactProfile = (btn) => {
    btn.addEventListener('click', () =>{
        contactProfile.classList.remove('active-view')
    })
}

const closeCurrentChat = (btn) => {
    btn.addEventListener('click', () =>{
        activeChat.classList.remove('active-view')
    })
}

const showLastTime = (contactInfo) => {
    if(contactInfo.isOnline) {
        return "Online"
    } else {
        return new Date(contactInfo.lastTime).toLocaleString()
    }
}

export default printContactProfile;