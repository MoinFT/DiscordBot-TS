import { Client, Guild } from "discord.js";
import { QuerySingle } from "../databaseInteraction";

export default (client: Client): void => {
    client.on("guildCreate", (guild: Guild) => {
        handleGuildCreate(client, guild);
    });
};

async function handleGuildCreate(client: Client, guild: Guild) {
    QuerySingle(`INSERT INTO discordbot.guild SET guildID = "${guild.id}", ownerID = "${guild.ownerId}", memberLog_active = 0`);

    guild.members.cache.forEach((member) => {
        QuerySingle(`INSERT INTO discordbot.member SET guildID = "${guild.id}", memberID = "${member.id}"`);
    });

    guild.roles.cache.forEach((role) => {
        QuerySingle(`INSERT INTO discordbot.role SET guildID = "${guild.id}", roleID = "${role.id}", roleType = 0`);
    });

    guild.channels.cache.forEach((channel) => {
        QuerySingle(`INSERT INTO discordbot.channel SET guildID = "${guild.id}", channelID = "${channel.id}", channelType = "${channel.type}"`);
    });
}
