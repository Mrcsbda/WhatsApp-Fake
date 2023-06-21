import { getChats } from "../../services/getChats";

const loadMessages = async (idChat) => {
    const chats = await getChats();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
}

export default loadMessages