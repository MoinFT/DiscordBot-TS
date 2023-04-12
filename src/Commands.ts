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

export const setGuildSpecificCommands = async (interaction: CommandInteraction) => {
    let commands: Array<Command> = [];

    switch (interaction.commandName) {
        case "set-role-type":
            let roleTypeCommands: Array<Command> = await roleTypeSpecificCommands(interaction)
            roleTypeCommands.forEach((command) => {
                commands.push(command);
            });
            break;
    }

    if (interaction.guild !== null) {
        interaction.guild.commands.set(commands);
    }
}

const roleTypeSpecificCommands = async (interaction: CommandInteraction) => {
    let commands: Array<Command> = [];

    if (interaction.guild === null) {
        return commands;
    }
    let guild: Guild = interaction.guild;

    let colorRoleIDArray: Array<{ roleID: string }> = await QueryMulti(`SELECT roleID FROM discordbot.role WHERE guildID = ${interaction.guildId} AND roleType = ${RoleType.Color}`);

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