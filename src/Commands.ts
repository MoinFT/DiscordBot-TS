import { Command } from "./Command";
import { Hello } from "./commands/Hello";

import { SetRoleType } from "./commands/admin/SetRoleType";

export const DefaultCommands: Command[] = [Hello];
export const AdminCommands: Command[] = [SetRoleType];

export const Commands: Command[] = DefaultCommands.concat(AdminCommands);