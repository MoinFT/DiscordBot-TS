import { ChannelType } from "discord.js"

export interface IChannel {
    id: number
    guildID: string
    channelID: string
    channelType: ChannelType
}