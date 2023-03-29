import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, MessageFlags, ChannelType } from "discord.js";
import { QuerySingle } from "../../databaseInteraction";
import { Command, CommandType } from "../../Command";

export const SetMemberLogChannel: Command = {
    commandType: CommandType.Ephemeral,
    name: "set-member-log-channel",
    description: "Sets a text channel as the guild member log",
    options: [{
        name: "channel",
        description: "CHANNEL which should be the member log (TextChannel)",
        type: ApplicationCommandOptionType.Channel
    }],
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        let channelID = null;
        let content = `The member log for the guild is now disabled!`;

        if (interaction.options.data.at(0)?.channel != null) {
            if (interaction.options.data.at(0)?.channel?.type == ChannelType.GuildText) {
                channelID = interaction.options.data.at(0)?.channel?.id;
                content = `The channel ${interaction.options.data.at(0)?.channel} was set as the member log.`;
            } else {
                content = `The channel ${interaction.options.data.at(0)?.channel} was not set as the member log! The channel is not a text channel!`;
            }
        }

        QuerySingle(`UPDATE discordbot.guild SET memberLog_active = ${channelID != null}, memberLog_channelID = ${channelID} WHERE guildID = ${interaction.guildId} AND guildID = ${interaction.guildId}`)

        await interaction.followUp({
            content
        });
    }
};