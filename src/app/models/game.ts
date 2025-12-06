export interface Game {
    activeTeam: string // This will be a select from the active teams list
    oposingTeam: string // This will be a select from the teams list
    date: number // The date will be stored as an epoch
    result: string // Also create an enum with win, lose and future values
    platform: string // Also a select, start with the values Betano and Bwin for now
    odds: number
    bet: number
    _id?: string
    _rev?: string
}