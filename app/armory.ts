export class Armory {
    Head: ArmorPiece[];
    Chest: ArmorPiece[];
    Arms: ArmorPiece[];
    Legs: ArmorPiece[];
}

export class ArmorPiece {
    PieceId: number;
    SetId: number;

    Enabled: boolean;

    Name: string;
    Weight: number;

    Physical: number;
    Strike: number;
    Slash: number;
    Thrust: number;

    Magic: number;
    Fire: number;
    Lightning: number;
    Dark: number;

    Bleed: number;
    Poison: number;
    Frost: number;
    Curse: number;

    Poise: number;    
}