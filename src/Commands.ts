import { ApplicationCommandOptionType, Guild, PermissionFlagsBits, Role } from "discord.js";
import { Command } from "./Command";

import { Hello } from "./commands/Hello";
import { Show } from "./commands/Show";

import { Color } from "./commands/Color";

import { SetRoleType } from "./commands/admin/SetRoleType";
import { SetMemberLogChannel } from "./commands/admin/SetMemberLogChannel";
import { getColorRoles } from "./utils/roles";

const getAdminCommands = () => {
    let AdminCommands: Array<Command> = [SetRoleType, SetMemberLogChannel];

    return AdminCommands.map((command): Command => {
        return {
            ...command,
            defaultMemberPermissions: PermissionFlagsBits.Administrator
        }
    });
}

export const DefaultCommands: Array<Command> = [Hello, Show];
export const GuildCommands: Array<Command> = [Color];
export const AdminCommands: Array<Command> = getAdminCommands();

export const AllCommands: Array<Command> = DefaultCommands.concat(GuildCommands).concat(AdminCommands);

export const setGuildSpecificCommands = async (guild: Guild) => {
    let commands: Array<Command> = [];

    let roleTypeCommands: Array<Command> = await roleTypeSpecificCommands(guild)
    roleTypeCommands.forEach((command) => {
        commands.push(command);
    });
    
    guild.commands.set(commands)
}

const roleTypeSpecificCommands = async (guild: Guild) => {
    let commands: Array<Command> = [];

    let colorRoleIDArray: Array<{ roleID: string }> = await getColorRoles(guild.id);

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