import { ChannelType, Client, DMChannel, NonThreadGuildBasedChannel } from "discord.js";
import { QuerySingle } from "../databaseInteraction";

export default (client: Client): void => {
    client.on("channelDelete", (channel: DMChannel | NonThreadGuildBasedChannel) => {
        handleChannelCreate(client, channel);
    });
};

async function handleChannelCreate(client: Client, channel: DMChannel | NonThreadGuildBasedChannel) {
    if(channel.type === ChannelType.DM) {
        return;
    }

    QuerySingle(`DELETE FROM discordbot.channel WHERE guildID = "${channel.guild.id}" AND channelID = "${channel.id}"`);
}