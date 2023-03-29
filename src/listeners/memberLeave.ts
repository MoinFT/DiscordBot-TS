import { Client, EmbedBuilder, GuildMember, PartialGuildMember, TextChannel } from "discord.js";
import { getGuild, IGuild } from "../interfaces/guild";

export default (client: Client): void => {
    client.on("guildMemberRemove", (member: GuildMember | PartialGuildMember) => {
        handleMemberLeave(client, member);
    });
};

async function handleMemberLeave(client: Client, member: GuildMember | PartialGuildMember) {
    let guild: IGuild = await getGuild(member.guild.id);

    let channel = undefined;
    if (guild.memberLog_active && guild.memberLog_channelID != undefined) {
        channel = member.guild.channels.cache.get(guild.memberLog_channelID.toString());
    }

    if (channel !== undefined && channel?.isTextBased()) {
        channel = channel as TextChannel;

        let memberIconURL = member.user.avatarURL() ?? undefined;
        let clientIconURL = client.user?.avatarURL() ?? undefined;

        let memberJoinDate = member.joinedAt?.getDate();
        let memberJoinMonth = member.joinedAt?.getMonth();
        let memberJoinYear = member.joinedAt?.getFullYear();
        let memberJoinHour = member.joinedAt?.getHours();
        let memberJoinMinute = member.joinedAt?.getMinutes();

        let memberJoinDateString = "";
        if (memberJoinDate && memberJoinMonth && memberJoinYear && memberJoinHour && memberJoinMinute) {
            memberJoinDateString = `${memberJoinDate}.${memberJoinMonth + 1}.${memberJoinYear} ${memberJoinHour}:${memberJoinMinute}`;
        }

        let embedMessage = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag}`, iconURL: memberIconURL })
            .setDescription(`
                • Benutzername: ${member.user} - ${member.user.tag}
                • Erstellt: <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)
                • Beigetreten: <t:${Math.floor((member.joinedTimestamp ?? 0) / 1000)}> (<t:${Math.floor((member.joinedTimestamp ?? 0) / 1000) }:R>)
                • Verlassen: <t:${Math.floor(new Date().getTime() / 1000)}> (<t:${Math.floor(new Date().getTime() / 1000) }:R>)
            `)
            .setFooter({ text: `Benutzer hat verlassen • ${memberJoinDateString}`, iconURL: clientIconURL })
            .setColor(0xff6666);

        channel.send({ embeds: [embedMessage] });
    }
}
