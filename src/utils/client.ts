import { APIRole, Client, Role } from "discord.js"

export const roleIsHigher = (client: Client, guildID: string | null, role: Role | APIRole | undefined | null): boolean | undefined => {
    if (guildID === null || role === undefined || role === null) {
        return undefined;
    }

    let clientID = client.application?.id;
    let clientHighestRole: Role | undefined;

    if (clientID !== undefined) {
        clientHighestRole = client.guilds.cache.get(guildID)?.members.cache.get(clientID)?.roles.highest;
    }

    if (clientHighestRole !== undefined) {
        return clientHighestRole.position < role.position;
    }

    return undefined;
}