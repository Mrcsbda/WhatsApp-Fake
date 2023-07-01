import { getUsers } from "../../services/getUsers";
import printListChats from "./printListChats";

const inputSearch = document.getElementById('searchContact');

export const searchContact = async () => {
    const users = await getUsers()
    let filteredUsers = []
    inputSearch.addEventListener('keydown', debounce(() => {
        filteredUsers = users.filter(user => user.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
        printListChats(filteredUsers)
        filteredUsers = [];
      }, 1000))
}

export const debounce = (callback, wait) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }