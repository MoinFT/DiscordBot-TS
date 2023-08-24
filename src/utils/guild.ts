import { Guild } from "discord.js";

export const getMembersCount = (guild: Guild) => {
    let memberCount = 0;

    guild.members.cache.forEach((member) => {
        if (!member.user.bot) {
            memberCount++;
        }
    });

    return memberCount;
}

export const getMembersOnlineCount = (guild: Guild) => {
    let memberOnlineCount = 0;

    guild.members.cache.forEach((member) => {
        let memberPresence = member.presence;

        if (memberPresence !== null) {
            if (!member.user.bot && memberPresence.status !== "offline") {
                memberOnlineCount++;
            }
        }
    });

    return memberOnlineCount;
}