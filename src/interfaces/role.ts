export interface IRole {
    id: number
    guildID: string
    roleID: string
    roleType: RoleType
}

export enum RoleType {
    Default,
    Color
}