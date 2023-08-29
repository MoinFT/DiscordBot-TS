import { Client, CommandInteraction, EmbedBuilder, Guild, GuildMember, time } from "discord.js";
import { getMembersCount, getMembersOnlineCount } from "../utils/guild";

export const Show_Guild = async (client: Client, interaction: CommandInteraction) => {
    let guild: Guild | undefined;
    if (interaction.guild !== null) {
        guild = interaction.guild;
    }

    let owner: GuildMember | undefined;
    if (guild !== undefined) {
        let members = guild.members.cache;
        owner = members.find((member) => {
            if (guild !== undefined) {
                return member.id === guild.ownerId;
            }
        });
    }

    if (guild !== undefined && owner !== undefined) {
        let embedMessage = new EmbedBuilder();

        let iconURL = guild.iconURL();
        let createdAt = guild.createdAt;

        if (iconURL !== null) {
            embedMessage.setAuthor({ name: guild.name, iconURL: iconURL });
            embedMessage.setThumbnail(iconURL);
        } else {
            embedMessage.setAuthor({ name: interaction.user.username });
        }

        embedMessage.setTitle("Guild Info");
        embedMessage.addFields({ name: "Owner", value: owner.user.username });

        if (createdAt !== null) {
            embedMessage.addFields({ name: "Created at", value: time(createdAt, 'R') });
        }

        embedMessage.addFields({ name: "Member count", value: getMembersCount(guild).toString() });
        embedMessage.addFields({ name: "Member count (Online)", value: getMembersOnlineCount(guild).toString() });

        let botUser = client.user;
        if (botUser !== null) {
            let botAvatarUrl = botUser.avatarURL()

            if (botAvatarUrl !== null) {
                embedMessage.setFooter({ text: botUser.username, iconURL: botAvatarUrl });
            } else {
                embedMessage.setFooter({ text: botUser.username });
            }
        }
        embedMessage.setTimestamp(new Date());

        await interaction.followUp({
            embeds: [embedMessage]
        })
    } else {
        await interaction.followUp({
            content: "An error occured: No members were found!"
        });
    }
}
