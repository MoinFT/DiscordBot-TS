import { Command } from "./Command";
import { Hello } from "./commands/Hello";

import { SetRoleType } from "./commands/admin/SetRoleType";
import { SetMemberLogChannel } from "./commands/admin/SetMemberLogChannel";
import { PermissionFlagsBits } from "discord.js";

const getAdminCommands = () => {
    let AdminCommands: Command[] = [SetRoleType, SetMemberLogChannel];

    return AdminCommands.map((command): Command => {
        return {
            ...command,
            defaultMemberPermissions: PermissionFlagsBits.Administrator
        }
    });
}

export const DefaultCommands: Command[] = [Hello];
export const AdminCommands: Command[] = getAdminCommands();

export const Commands: Command[] = DefaultCommands.concat(AdminCommands);