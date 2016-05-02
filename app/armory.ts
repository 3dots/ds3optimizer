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

export class ArmorCombination {
    
    Metric: number;
    
    constructor(public Head: ArmorPiece, public Chest: ArmorPiece, public Arms: ArmorPiece, public Legs: ArmorPiece) {
        this.Weight = Head.Weight + Chest.Weight + Arms.Weight + Legs.Weight;
        
        this.Physical = 1 - (1 - Head.Physical / 100) * (1 - Chest.Physical / 100) * (1 - Arms.Physical / 100) * (1 - Legs.Physical / 100);
        this.Strike = 1 - (1 - Head.Strike / 100) * (1 - Chest.Strike / 100) * (1 - Arms.Strike / 100) * (1 - Legs.Strike / 100);
        this.Slash = 1 - (1 - Head.Slash / 100) * (1 - Chest.Slash / 100) * (1 - Arms.Slash / 100) * (1 - Legs.Slash / 100);
        this.Thrust = 1 - (1 - Head.Thrust / 100) * (1 - Chest.Thrust / 100) * (1 - Arms.Thrust / 100) * (1 - Legs.Thrust / 100);
        
        this.Magic = 1 - (1 - Head.Magic / 100) * (1 - Chest.Magic / 100) * (1 - Arms.Magic / 100) * (1 - Legs.Magic / 100);
        this.Fire = 1 - (1 - Head.Fire / 100) * (1 - Chest.Fire / 100) * (1 - Arms.Fire / 100) * (1 - Legs.Fire / 100);
        this.Lightning = 1 - (1 - Head.Lightning / 100) * (1 - Chest.Lightning / 100) * (1 - Arms.Lightning / 100) * (1 - Legs.Lightning / 100);
        this.Dark = 1 - (1 - Head.Dark / 100) * (1 - Chest.Dark / 100) * (1 - Arms.Dark / 100) * (1 - Legs.Dark / 100);
        
        this.Bleed = Head.Bleed + Chest.Bleed + Arms.Bleed + Legs.Bleed;
        this.Poison = Head.Poison + Chest.Poison + Arms.Poison + Legs.Poison;
        this.Frost = Head.Frost + Chest.Frost + Arms.Frost + Legs.Frost;
        this.Curse = Head.Curse + Chest.Curse + Arms.Curse + Legs.Curse;
        this.Poise = Head.Poise + Chest.Poise + Arms.Poise + Legs.Poise;
    }

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

