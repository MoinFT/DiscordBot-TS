import { CommandInteraction, Client, Interaction } from "discord.js";
import { CommandType } from "../Command";
import { AllCommands } from "../Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = AllCommands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    if (slashCommand.commandType == CommandType.Ephemeral) {
        await interaction.deferReply({ ephemeral: true });
    } else {
        await interaction.deferReply();
    }

    slashCommand.run(client, interaction);
};