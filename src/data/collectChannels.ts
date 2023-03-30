import { Client } from "discord.js";
import { IChannel } from "../interfaces/channel";
import { QueryMulti, QuerySingle } from "../databaseInteraction";

export default (client: Client) => {
    client.guilds.cache.forEach(async (guild) => {
        let channels: Array<IChannel> = await QueryMulti(`SELECT guildID, channelID FROM discordbot.channel`);

        guild.channels.cache.forEach((channel) => {
            let channelIndex = channels.findIndex((value) => { return value.guildID === guild.id && value.channelID === channel.id });

            if (channelIndex === -1) {
                QuerySingle(`INSERT INTO discordbot.channel SET guildID = "${guild.id}", channelID = "${channel.id}", channelType = "${channel.type}"`);
            }
        });

        channels.forEach((value) => {
            let channelKey = guild.channels.cache.findKey((channel) => {
                return channel.id === value.channelID;
            });

            if (value.guildID === guild.id && channelKey === undefined) {
                QuerySingle(`DELETE FROM discordbot.channel WHERE guildID = "${value.guildID}" AND channelID = "${value.channelID}"`);
            }
        });
    });
};
