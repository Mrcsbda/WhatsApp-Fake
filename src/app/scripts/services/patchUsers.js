import axios from "axios"
import { endpoints } from "./data"

export const patchUsers = async (id, isLogin) => {
    try {
        
        const currentUserDataUpdated = {
            isOnline:isLogin,
            lastTime: new Date().getTime()
        }

        if (isLogin) delete currentUserDataUpdated.lastTime;

        const response = await axios.patch(`${endpoints.urlUsers}/${id}`, currentUserDataUpdated)
    } catch (error) {
        console.log(error)
    }
}