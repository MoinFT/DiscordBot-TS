import { CommandInteraction, Client, ApplicationCommandType, GuildMemberRoleManager, Role, Guild } from "discord.js";
import { Command, CommandType } from "../Command";
import { QueryMulti } from "../databaseInteraction";
import { RoleType } from "../interfaces/role";

export const Color: Command = {
    commandType: CommandType.Ephemeral,
    name: "color",
    description: "Sets the color of your name",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        if (interaction.guild === null) {
            await interaction.followUp({
                content: "An error is occured!"
            });
            return;
        }
        let guild: Guild = interaction.guild;

        let colorRoleIDArray: Array<{ roleID: string }> = await QueryMulti(`SELECT roleID FROM discordbot.role WHERE guildID = "${guild.id}" AND roleType = ${RoleType.Color}`);

        let colorRoles: Array<Role> = [];

        colorRoleIDArray.forEach((value) => {
            let colorRole = guild.roles.cache.find((role) => { return role.id === value.roleID; })

            if (colorRole !== undefined) {
                colorRoles.push(colorRole);
            }
        });

        let member = interaction.member;
        let memberRoles: GuildMemberRoleManager | undefined;
        let content = "Your name has now NO color";

        if (member !== null) {
            let guildMember = guild.members.cache.get(member.user.id);

            if (guildMember !== undefined) {
                memberRoles = guildMember.roles;
            }

            await new Promise((resolve) => {
                colorRoles.forEach(async (value) => {
                    if (value !== undefined && memberRoles !== undefined) {
                        resolve(await memberRoles.remove(value));
                    }
                });
            });

            let commandOption = interaction.options.get("color");

            if (commandOption !== null) {
                let colorRole = colorRoles.find((value) => {
                    if (commandOption !== null && typeof commandOption.value === "string") {
                        return value.name.toUpperCase() === commandOption.value.toUpperCase()
                    }
                });

                if (colorRole !== undefined && memberRoles !== undefined) {
                    memberRoles.add(colorRole);
                    content = `Your name has now the color "${colorRole.name.toUpperCase()}"`;
                }
            }
        }

        await interaction.followUp({
            content
        });
    }
};