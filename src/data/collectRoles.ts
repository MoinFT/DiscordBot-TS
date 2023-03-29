import { Client } from "discord.js";
import { IRole } from "../interfaces/role";
import { QueryMulti, QuerySingle } from "../databaseInteraction";

export default (client: Client) => {
    client.guilds.cache.forEach(async (guild) => {
        let roles: Array<IRole> = await QueryMulti(`SELECT roleID FROM discordbot.role`);

        guild.roles.cache.forEach((role) => {
            let guildIndex = roles.findIndex((value) => { return value.roleID === role.id });

            if (guildIndex === -1) {
                QuerySingle(`INSERT INTO discordbot.role SET guildID = "${guild.id}", roleID = "${role.id}", roleType = 0`);
            }
        });
    });
};
