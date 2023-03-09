import { Client } from "discord.js";
import { IMember } from "../interfaces/member";
import { QueryMulti, QuerySingle } from "../databaseInteraction";

export default (client: Client) => {
    client.guilds.cache.forEach(async (guild) => {
        let members: Array<IMember> = await QueryMulti(`SELECT memberID FROM discordbot.member`);

        guild.members.cache.forEach((member) => {
            let guildIndex = members.findIndex((value) => { return value.memberID === parseInt(member.id) });

            if (guildIndex === -1) {
                QuerySingle(`INSERT INTO discordbot.member SET guildID = "${guild.id}", memberID = "${member.id}"`);
            }
        });
    });
};
