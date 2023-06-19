import axios from "axios"
import { endpoints } from "./data"

export const getUsers = async () => {
    try {
        const {data, status} = await axios.get(endpoints.urlUsers)
    if (status === 200) {
        return data
    }
    } catch (error) {
        console.log(error)
        return []
    }
}