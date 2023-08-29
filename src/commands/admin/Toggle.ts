import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { Command, CommandType } from "../../Command";
import { Toggle_BotPermission } from "./Toggle_BotPermission";

export const Toggle: Command = {
    commandType: CommandType.Ephemeral,
    name: "toggle",
    description: "Invert a propertie",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "bot-permission",
            description: "Toggle the bot permission of a member",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "Select a member",
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
                case "bot-permission":
                    Toggle_BotPermission(client, interaction);
                    break;
            }
        }
    }
};