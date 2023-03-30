import { Client, Guild } from "discord.js";
import { QuerySingle } from "../databaseInteraction";

export default (client: Client): void => {
    client.on("guildDelete", (guild: Guild) => {
        handleGuildDelete(client, guild);
    });
};

async function handleGuildDelete(client: Client, guild: Guild) {
    QuerySingle(`DELETE FROM discordbot.guild WHERE guildID = "${guild.id}"`);

    QuerySingle(`DELETE FROM discordbot.member WHERE guildID = "${guild.id}"`);
    QuerySingle(`DELETE FROM discordbot.role WHERE guildID = "${guild.id}"`);
    QuerySingle(`DELETE FROM discordbot.channel WHERE guildID = "${guild.id}"`);
}
