import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command, CommandType } from "../Command";
import { Show_Members } from "./Show_Members";

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
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {

        let subcommand = interaction.options.data.at(0)?.name;

        if (subcommand !== undefined) {
            switch (subcommand) {
                case "members":
                    Show_Members(client, interaction)
            }
        }
    }
}; 