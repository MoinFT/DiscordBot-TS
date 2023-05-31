import { ApplicationCommandOptionType, Client, Collection, CommandInteraction, Guild, GuildMember, codeBlock } from "discord.js";
import { getColorRoles, highestNoneColorRole } from "../utils/roles";

export const Show_Members = async (client: Client, interaction: CommandInteraction) => {

    let members: Collection<string, GuildMember> | undefined;
    if (interaction.guild !== null) {
        members = interaction.guild.members.cache;
    }

    let options = interaction.options.data.at(0)?.options;

    let pageObject = options?.find((value) => { return value.name === "page" });
    let page = 1;
    if (pageObject !== undefined) {
        if (pageObject.type === ApplicationCommandOptionType.Number) {
            if (pageObject.value === undefined) return
            if (typeof pageObject.value === "string") return
            if (typeof pageObject.value === "boolean") return
            page = pageObject.value;
        }
    }

    let searchObject = options?.find((value) => { return value.name === "search" });
    let search: string | undefined;
    if (searchObject !== undefined) {
        if (searchObject.type === ApplicationCommandOptionType.String) {
            if (searchObject.value === undefined) return
            if (typeof searchObject.value === "number") return
            if (typeof searchObject.value === "boolean") return
            search = searchObject.value;
        }
    }

    if (members !== undefined) {
        members.sort((a, b) => {
            if (a.user.username > b.user.username) {
                return 1;
            } else {
                return -1;
            }
        });

        if (search !== undefined) {
            let searchString = search;
            members = members.filter((member) => {return member.user.username.includes(searchString) || member.nickname?.includes(searchString)});
        }

        let membersArray: Array<GuildMember> = [];
        members?.map((member) => {
            if (!member.user.bot) {
                membersArray.push(member);
            }
        });

        let pages = 1;

        if (members.size > 15) {
            pages = parseInt((members.size / 15).toString());
            if (members.size % 15 !== 0) {
                pages++;
            }
        }

        if (page < 0) {
            page = 1;
        } else if (page > pages) {
            page = pages;
        }

        membersArray = membersArray.slice(15 * (page - 1), 15 * page);

        let message = codeBlock(`Username${spaces(8, 25)}Nickname${spaces(8, 25)}Highest Role${spaces(12, 25)}`);

        let memberListMessage = "";
        await Promise.all(
            membersArray.map(async (member) => {
                let username = member.user.username;
                let nickname = member.nickname ?? "";

                let highestRole = await highestNoneColorRole(member.guild.id, member.roles.cache);

                let highestRoleName = "";
                if (highestRole !== undefined) {
                    highestRoleName = highestRole.name;
                }

                memberListMessage += `${username}${spaces(username.length, 25)}${nickname}${spaces(nickname.length, 25)}${highestRoleName}${spaces(highestRoleName.length, 25)}\n`;
            })
        );
        message += codeBlock(memberListMessage);
        message += codeBlock(`Page: ${page} of ${pages}`);

        await interaction.followUp({
            content: message
        });
    } else {
        await interaction.followUp({
            content: "An error occured: No members were found!"
        });
    }
}

const spaces = (originalLength: number, targetLength: number) => {
    let spaces = "";

    for (let i = 0; i < targetLength - originalLength; i++) {
        spaces += " ";
    }

    return spaces;
}

