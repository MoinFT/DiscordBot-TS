import { Client, Role } from "discord.js";
import { QuerySingle } from "../databaseInteraction";
import { RoleType } from "../interfaces/role";
import { setGuildSpecificCommands } from "../Commands";
import { roleIsHigher } from "../utils/client";

export default (client: Client): void => {
    client.on("roleUpdate", (role: Role) => {
        handleRoleUpdate(client, role);
    });
};

async function handleRoleUpdate(client: Client, role: Role) {
    let rolePositionHigher = roleIsHigher(client, role.guild.id, role)

    if (rolePositionHigher !== undefined && rolePositionHigher) {
        QuerySingle(`UPDATE discordbot.role SET roleType = ${RoleType.Default} WHERE guildID = ${role.guild.id} AND roleID = ${role.id}`);

        setGuildSpecificCommands(role.guild);
    }
}
