import { Client, Collection, CommandInteraction, EmbedBuilder, GuildMember, User, inlineCode, time, userMention } from "discord.js";
import { highestNoneColorRole } from "../utils/roles";

export const Show_Member = async (client: Client, interaction: CommandInteraction) => {
    let members: Collection<string, GuildMember> | undefined;
    if (interaction.guild !== null) {
        members = interaction.guild.members.cache;
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

    if (user !== undefined && member !== undefined) {
        let embedMessage = new EmbedBuilder();

        let userAvatarURL = user.avatarURL();
        let nickname = member.nickname;
        let joinedAt = member.joinedAt;

        let highestRole = await highestNoneColorRole(member.guild.id, member.roles.cache);
        let color = 0;
        let roleName = "everyone";
        if (highestRole !== undefined) {
            color = highestRole.color;
            roleName = highestRole.name;
        }

        if (userAvatarURL !== null) {
            embedMessage.setAuthor({ name: member.user.username, iconURL: userAvatarURL });
            embedMessage.setThumbnail(userAvatarURL);
        } else {
            embedMessage.setAuthor({ name: member.user.username });
        }

        embedMessage.setTitle("Member Info");
        embedMessage.setColor(color)

        embedMessage.addFields({ name: "Username", value: member.user.username, inline: true });

        if (nickname !== null) {
            embedMessage.addFields({ name: "Nickname", value: nickname, inline: true });
        }

        if (joinedAt !== null) {
            embedMessage.addFields({ name: "Server Member since", value: time(joinedAt, 'R') });
        }

        embedMessage.addFields({ name: "Highest Role", value: roleName, inline: true });

        if (member.id === member.guild.ownerId) {
            embedMessage.addFields({ name: "Server Owner", value: "Yes", inline: true });
        }

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
