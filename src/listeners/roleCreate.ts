import { Client, Role } from "discord.js";
import { QuerySingle } from "../databaseInteraction";

export default (client: Client): void => {
    client.on("roleCreate", (role: Role) => {
        handleRoleCreate(client, role);
    });
};

async function handleRoleCreate(client: Client, role: Role) {
    QuerySingle(`INSERT INTO discordbot.role SET guildID = "${role.guild.id}", roleID = "${role.id}", roleType = 0`);
}
