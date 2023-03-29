import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, MessageFlags } from "discord.js";
import { QuerySingle } from "../../databaseInteraction";
import { RoleType } from "../../interfaces/role";
import { Command, CommandType } from "../../Command";

export const SetRoleType: Command = {
    commandType: CommandType.Ephemeral,
    name: "set-role-type",
    description: "Sets the type of a role",
    options: [{
        name: "role",
        description: "ROLE to which the type is assigned",
        type: ApplicationCommandOptionType.Role,
        required: true
    },
    {
        name: "type",
        description: "TYPE which is assigned to the role",
        type: ApplicationCommandOptionType.String,
        choices: [{
            name: "DEFAULT",
            value: "DEFAULT"
        },
        {
            name: "COLOR",
            value: "COLOR"
        }],
        required: true
    }],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        let roleType: number;
        let roleTypeString: string;

        switch (interaction.options.get("type", true).value) {
            case "COLOR":
                roleType = RoleType.Color;
                roleTypeString = "Color";
                break;
            default:
                roleType = RoleType.Default;
                roleTypeString = "Default";
        }

        QuerySingle(`UPDATE discordbot.role SET roleType = ${roleType} WHERE guildID = ${interaction.guildId} AND roleID = ${interaction.options.data.at(0)?.role?.id}`)

        let content = `The role ${interaction.options.data.at(0)?.role} was assigned the role type "${roleTypeString}"`;

        await interaction.followUp({
            content
        });
    }
};