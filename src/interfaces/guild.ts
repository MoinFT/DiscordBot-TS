import { QuerySingle } from "../databaseInteraction"

export interface IGuild {
    id: number
    guildID: string
    ownerID: string
    memberLog_active: boolean
    memberLog_channelID?: string
}

export const getGuild = async (guildID: string): Promise<any> => {
    let DBResponse = await QuerySingle(`SELECT id, guildID, ownerID, memberLog_active, memberLog_channelID FROM discordbot.guild WHERE guildID = "${guildID}"`);

    return DBResponse;
}