import { Client, Guild, GuildMember, PartialGuildMember } from "discord.js";
import { QuerySingle } from "../databaseInteraction";

export default (client: Client): void => {
    client.on("guildMemberUpdate", (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
        handleMemberUpdate(client, newMember);
    });
};

async function handleMemberUpdate(client: Client, member: GuildMember) {
    let botPermission = false;
    if (member.permissions.has("Administrator")) {
        botPermission = true;
    }

    QuerySingle(`UPDATE discordbot.member SET botPermission = ${botPermission} WHERE guildID = ${member.guild.id} AND memberID = ${member.id}`);
}
