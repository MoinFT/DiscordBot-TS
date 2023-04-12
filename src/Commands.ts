import { Command } from "./Command";
import { Hello } from "./commands/Hello";

import { SetRoleType } from "./commands/admin/SetRoleType";
import { SetMemberLogChannel } from "./commands/admin/SetMemberLogChannel";
import { ApplicationCommandOptionType, CommandInteraction, Guild, PermissionFlagsBits, Role } from "discord.js";
import { Color } from "./commands/Color";
import { RoleType } from "./interfaces/role";
import { QueryMulti } from "./databaseInteraction";

const getAdminCommands = () => {
    let AdminCommands: Array<Command> = [SetRoleType, SetMemberLogChannel];

    return AdminCommands.map((command): Command => {
        return {
            ...command,
            defaultMemberPermissions: PermissionFlagsBits.Administrator
        }
    });
}

export const DefaultCommands: Array<Command> = [Hello];
export const GuildCommands: Array<Command> = [Color];
export const AdminCommands: Array<Command> = getAdminCommands();

export const AllCommands: Array<Command> = DefaultCommands.concat(GuildCommands).concat(AdminCommands);

export const setGuildSpecificCommands = async (guild: Guild) => {
    let commands: Array<Command> = [];

    commands.concat(await roleTypeSpecificCommands(guild));

        guild.commands.set(commands);
}

const roleTypeSpecificCommands = async (guild: Guild) => {
    let commands: Array<Command> = [];

    let colorRoleIDArray: Array<{ roleID: string }> = await QueryMulti(`SELECT roleID FROM discordbot.role WHERE guildID = ${guild.id} AND roleType = ${RoleType.Color}`);

    if (colorRoleIDArray.length !== 0) {
        let colorRoles: Array<Role> = [];

        colorRoleIDArray.forEach((value) => {
            let colorRole = guild.roles.cache.find((role) => { return role.id === value.roleID; })

            if (colorRole !== undefined) {
                colorRoles.push(colorRole);
            }
        });

        let colorChoices = colorRoles.map((colorRole) => {
            return {
                name: colorRole.name.toUpperCase(),
                value: colorRole.name.toUpperCase()
            }
        });

        let colorCommand: Command = {
            ...Color,
            options: [{
                name: "color",
                description: "COLOR which your name should have",
                type: ApplicationCommandOptionType.String,
                choices: colorChoices
            }]
        }

        commands.push(colorCommand);
    }

    return commands;
}