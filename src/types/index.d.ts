export interface Team {
    id: string | null | undefined;
    name: string | null | undefined;
    flag: string | null | undefined | unknown;
    country : Country | null | undefined;
    league : League | null | undefined; 
}

export interface Country {
    id: string | null | undefined;
    name: string | null | undefined;
    flag: string | null | undefined | unknown;
}

export interface League { 
    id: string | null | undefined;
    name: string | null | undefined;
    flag: string | null | undefined | unknown;
    country : Country | null | undefined;
}

export interface Game { 
    id: string | null | undefined;
    home: Team | null | undefined;
    away: Team | null | undefined;
    homeScore: string | null | undefined;
    awayScore: string | null | undefined;
    time: string | null | undefined;
    league : League | null | undefined;
    country : Country | null | undefined;
}

