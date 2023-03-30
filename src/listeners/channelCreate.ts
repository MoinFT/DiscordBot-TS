import { Client, NonThreadGuildBasedChannel } from "discord.js";
import { QuerySingle } from "../databaseInteraction";

export default (client: Client): void => {
    client.on("channelCreate", (channel: NonThreadGuildBasedChannel) => {
        handleChannelCreate(client, channel);
    });
};

async function handleChannelCreate(client: Client, channel: NonThreadGuildBasedChannel) {
    QuerySingle(`INSERT INTO discordbot.channel SET guildID = "${channel.guild.id}", channelID = "${channel.id}", channelType = ${channel.type}`);
}
