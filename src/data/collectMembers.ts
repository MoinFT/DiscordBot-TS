import { Client } from "discord.js";
import { IMember } from "../interfaces/member";
import { QueryMulti, QuerySingle } from "../databaseInteraction";

export default (client: Client) => {
    client.guilds.cache.forEach(async (guild) => {
        let members: Array<IMember> = await QueryMulti(`SELECT guildID, memberID FROM discordbot.member`);

        guild.members.cache.forEach((member) => {
            let memberIndex = members.findIndex((value) => { return value.guildID === member.guild.id && value.memberID === member.id });

            if (memberIndex === -1) {
                let botPermission = false;
                if (member.permissions.has("Administrator")) {
                    botPermission = true;
                }

                QuerySingle(`INSERT INTO discordbot.member SET guildID = "${guild.id}", memberID = "${member.id}", botPermission = ${botPermission}`);
            }
        });

        members.forEach((value) => {
            let memberKey = guild.members.cache.findKey((member) => {
                return member.id === value.memberID;
            });

            if (value.guildID === guild.id && memberKey === undefined) {
                QuerySingle(`DELETE FROM discordbot.member WHERE guildID = "${value.guildID}" AND memberID = "${value.memberID}"`);
            }
        });
    });
};
