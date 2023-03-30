import { Client, Role } from "discord.js";
import { QuerySingle } from "../databaseInteraction";

export default (client: Client): void => {
    client.on("roleDelete", (role: Role) => {
        handleRoleDelete(client, role);
    });
};

async function handleRoleDelete(client: Client, role: Role) {
    QuerySingle(`DELETE FROM discordbot.role WHERE guildID = "${role.guild.id}" AND roleID = "${role.id}"`);
}
