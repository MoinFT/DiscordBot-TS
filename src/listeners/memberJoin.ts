import { Client, EmbedBuilder, GuildMember, TextChannel } from "discord.js";

export default (client: Client): void => {
    client.on("guildMemberAdd", (member: GuildMember) => {
        handleMemberJoin(client, member);
    });
};

function handleMemberJoin(client: Client, member: GuildMember) {
    let channel = member.guild.channels.cache.get('<ChannelID>');

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
            `)
            .setFooter({ text: `Benutzer ist beigetreten • ${memberJoinDateString}`, iconURL: clientIconURL })
            .setColor(0x77FF55);

        channel.send({ embeds: [embedMessage] });
    }
}
