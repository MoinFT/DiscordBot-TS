import { ChannelType } from "discord.js"

export interface IChannel {
    id: number
    guildID: number
    channelID: number
    channelType: ChannelType
}