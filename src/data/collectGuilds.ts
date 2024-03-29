import { Client } from "discord.js";
import { IGuild } from "../interfaces/guild";
import { QueryMulti, QuerySingle } from "../databaseInteraction";

export default async (client: Client) => {
    let guilds: Array<IGuild> = await QueryMulti(`SELECT guildID FROM discordbot.guild`);

    client.guilds.cache.forEach((guild) => {
        let guildIndex = guilds.findIndex((value) => { return value.guildID === guild.id });

        if (guildIndex === -1) {
            QuerySingle(`INSERT INTO discordbot.guild SET guildID = "${guild.id}", ownerID = "${guild.ownerId}", memberLog_active = false`);
        }
    });

    guilds.forEach((value) => {
        let guildKey = client.guilds.cache.findKey((guild) => {
            return guild.id === value.guildID;
        });

        if (guildKey === undefined) {
            QuerySingle(`DELETE FROM discordbot.guild WHERE guildID = "${value.guildID}"`);
        }
    });
};
