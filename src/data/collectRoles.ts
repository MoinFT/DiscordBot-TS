import { Client } from "discord.js";
import { IRole } from "../interfaces/role";
import { QueryMulti, QuerySingle } from "../databaseInteraction";

export default (client: Client) => {
    client.guilds.cache.forEach(async (guild) => {
        let roles: Array<IRole> = await QueryMulti(`SELECT guildID, roleID FROM discordbot.role`);

        guild.roles.cache.forEach((role) => {
            let roleIndex = roles.findIndex((value) => { return value.guildID === guild.id && value.roleID === role.id });

            if (roleIndex === -1) {
                QuerySingle(`INSERT INTO discordbot.role SET guildID = "${guild.id}", roleID = "${role.id}", roleType = 0`);
            }
        });

        roles.forEach((value) => {
            let roleKey = guild.roles.cache.findKey((role) => {
                return role.id === value.roleID;
            });

            if (value.guildID === guild.id && roleKey === undefined) {
                QuerySingle(`DELETE FROM discordbot.role WHERE guildID = "${value.guildID}" AND roleID = "${value.roleID}"`);
            }
        });
    });
};
