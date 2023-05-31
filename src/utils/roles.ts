import { RoleType } from "../interfaces/role";
import { QueryMulti } from "../databaseInteraction";
import { Role } from "discord.js";

export const getColorRoles = async (guildID: string) => {
    let colorRoleIDArray: Array<{ roleID: string }> = await QueryMulti(`SELECT roleID FROM discordbot.role WHERE guildID = ${guildID} AND roleType = ${RoleType.Color}`);
    return colorRoleIDArray;
}

export const highestNoneColorRole = async (guildID: string, roles: Map<string, Role>) => {
    let highestRole: Role | undefined;
    let colorRoles = await getColorRoles(guildID);

    roles.forEach((role) => {
        let isColorRole = colorRoles.findIndex((colorRole) => { return colorRole.roleID === role.id }) !== -1;

        if (highestRole !== undefined) {
            if (highestRole.rawPosition < role.rawPosition && !isColorRole) {
                highestRole = role;
            }
        } else {
            if (!isColorRole) {
                highestRole = role;
            }
        }
    });

    return highestRole;
}