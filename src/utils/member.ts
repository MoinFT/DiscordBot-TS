import { IMember } from "../interfaces/member";
import { QuerySingle } from "../databaseInteraction";

export const getMember = async (guildID: string, memberID: string): Promise<IMember> => {
    return await QuerySingle(`SELECT id, guildID, memberID, botPermission FROM discordbot.member WHERE guildID = ${guildID} AND memberID = ${memberID}`);
}

export const setBotPermission = async (guildID: string, memberID: string, botPermission: boolean) => {
    QuerySingle(`UPDATE discordbot.member SET botPermission = ${botPermission} WHERE guildID = ${guildID} AND memberID = ${memberID}`);
}