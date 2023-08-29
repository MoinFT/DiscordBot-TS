import { Client, Collection, CommandInteraction, EmbedBuilder, Guild, GuildMember, User, time } from "discord.js";
import { getMember, setBotPermission } from "../../utils/member";

export const Toggle_BotPermission = async (client: Client, interaction: CommandInteraction) => {
    let guild: Guild | undefined;
    let members: Collection<string, GuildMember> | undefined;
    if (interaction.guild !== null) {
        guild = interaction.guild;
        members = guild.members.cache;
    }

    let options = interaction.options.data.at(0)?.options;

    let memberObject = options?.find((value) => { return value.name === "member" });
    let user: User | undefined;
    if (memberObject !== undefined) {
        if (memberObject.user !== undefined) {
            user = memberObject.user;
        }
    }
    let member: GuildMember | undefined;
    if (user !== undefined && members !== undefined) {
        member = members.find((member) => {
            if (user !== undefined) {
                return member.id === user.id;
            }
        });
    }

    if (guild !== undefined && user !== undefined && member !== undefined) {
        let embedMessage = new EmbedBuilder();

        let dbMember = await getMember(guild.id, member.id);

        setBotPermission(guild.id, member.id, !dbMember.botPermission)

        let userAvatarURL = user.avatarURL();
        let newBotPermission = !dbMember.botPermission;
        let nickname = member.nickname;
        let joinedAt = member.joinedAt;

        if (userAvatarURL !== null) {
            embedMessage.setAuthor({ name: user.username, iconURL: userAvatarURL });
        } else {
            embedMessage.setAuthor({ name: user.username });
        }

        if (nickname !== null) {
            embedMessage.addFields({ name: "Nickname", value: nickname, inline: true });
        }

        if (joinedAt !== null) {
            embedMessage.addFields({ name: "Server Member since", value: time(joinedAt, 'R') });
        }

        let botPermissionString = "No";
        embedMessage.setColor(0xff6666);
        if (newBotPermission) {
            botPermissionString = "Yes";
            embedMessage.setColor(0x77FF55);
        }

        embedMessage.addFields({ name: "Bot-Permission", value: botPermissionString });

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
