import { Client } from "discord.js";
import { IChannel } from "../interfaces/channel";
import { QueryMulti, QuerySingle } from "../databaseInteraction";

export default (client: Client) => {
    client.guilds.cache.forEach(async (guild) => {
        let channels: Array<IChannel> = await QueryMulti(`SELECT channelID FROM discordbot.channel`);

        guild.channels.cache.forEach((channel) => {
            let guildIndex = channels.findIndex((value) => { return value.channelID === channel.id });

            if (guildIndex === -1) {
                QuerySingle(`INSERT INTO discordbot.channel SET guildID = "${guild.id}", channelID = "${channel.id}", channelType = "${channel.type}"`);
            }
        });
    });
};
