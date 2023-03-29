import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command, CommandType } from "../Command";

export const Hello: Command = {
    commandType: CommandType.Ephemeral,
    name: "hello",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Hello there!";

        await interaction.followUp({
            content
        });
    }
}; 