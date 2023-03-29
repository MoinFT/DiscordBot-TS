import { Command } from "./Command";
import { Hello } from "./commands/Hello";

import { SetRoleType } from "./commands/admin/SetRoleType";
import { SetMemberLogChannel } from "./commands/admin/SetMemberLogChannel";

export const DefaultCommands: Command[] = [Hello];
export const AdminCommands: Command[] = [SetRoleType, SetMemberLogChannel];

export const Commands: Command[] = DefaultCommands.concat(AdminCommands);