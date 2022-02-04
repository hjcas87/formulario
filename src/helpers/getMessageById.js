import { message } from "../data/dataMsg"


export const getMessageById = ( msgId ) => {
    return message.find( msg => msg.id === msgId )
}
