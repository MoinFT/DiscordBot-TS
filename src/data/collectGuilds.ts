import { Client } from "discord.js";
import { IGuild } from "../interfaces/guild";
import { QueryMulti, QuerySingle } from "../databaseInteraction";

export default async (client: Client) => {
    let guilds: Array<IGuild> = await QueryMulti(`SELECT id, guildID FROM discordbot.guild`);

    client.guilds.cache.forEach((guild) => {
        let guildIndex = guilds.findIndex((value) => { return value.guildID === parseInt(guild.id) });

        if (guildIndex === -1) {
            QuerySingle(`INSERT INTO discordbot.guild SET guildID = "${guild.id}", ownerID = "${guild.ownerId}", memberLog_active = false`);
        }
    });
};
