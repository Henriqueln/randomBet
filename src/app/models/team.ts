export interface Team {
    name: string;
    logo: string;
    id?: string;
    league: string;
    _id?: string;
    _rev?: string;
}

export interface ActiveTeam extends Team {
    currentLostValue: number;
    teamId: string;
}