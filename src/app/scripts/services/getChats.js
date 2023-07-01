import axios from "axios"
import { endpoints } from "./data"

export const getChats = async () => {
    try {
        const {data, status} = await axios.get(endpoints.urlChats)
    if (status === 200) {
        return data
    }
    } catch (error) {
        console.log(error)
        return []
    }
}