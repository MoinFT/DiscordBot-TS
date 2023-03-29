import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    commandType: CommandType
    run: (client: Client, interaction: CommandInteraction) => void;
}

export enum CommandType {
    Normal,
    Ephemeral
}