import { Log } from '../db/models'

export default class {
    static async create(adminId, action) {
        const logObject = {
            adminId,
            action
        }
        const newLog = await Log.create(logObject);

        return newLog

    }
}