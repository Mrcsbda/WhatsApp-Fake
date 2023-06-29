import { getUsers } from "../../services/getUsers";

const inputSearch = document.getElementById('searchContact');


export const searchContact = async () => {
    const users = await getUsers()
    console.log(users)
    let filteredUsers = []
    inputSearch.addEventListener('keydown', debounce(() => {
        filteredUsers = users.filter(user => user.name.includes(inputSearch.value))
        console.log(inputSearch.value)
        console.log(filteredUsers)
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