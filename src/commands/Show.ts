import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command, CommandType } from "../Command";
import { Show_Members } from "./Show_Members";
import { Show_Member } from "./Show_Member";

export const Show: Command = {
    commandType: CommandType.Ephemeral,
    name: "show",
    description: "Displays information",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "members",
            description: "Displays all members of the guild",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "search",
                    description: "Serach an username or a nickname",
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: "page",
                    description: "Choose the page",
                    type: ApplicationCommandOptionType.Number
                }
            ]
        },
        {
            name: "member",
            description: "Display one member of the guild",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "Select a member for more information",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        let subcommand = interaction.options.data.at(0)?.name;

        if (subcommand !== undefined) {
            switch (subcommand) {
                case "members":
                    Show_Members(client, interaction);
                    break;
                case "member":
                    Show_Member(client, interaction)
            }
        }
    }
};