export interface IRole {
    id: number
    guildID: number
    roleID: number
    roleType: RoleType
}

export enum RoleType {
    Default,
    Color
}