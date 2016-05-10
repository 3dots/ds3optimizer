import { ISortable } from './doublylinkedlist';

export class ArmoryData {
    Head: ArmorPiece[];
    Chest: ArmorPiece[];
    Arms: ArmorPiece[];
    Legs: ArmorPiece[];
    
    StartingCharacter: GameProgressArmorGroup[];
    GameProgressConditions: GameProgressArmorGroup[];
    
}

export class Armory {
    Head: ArmorPiece[];
    Chest: ArmorPiece[];
    Arms: ArmorPiece[];
    Legs: ArmorPiece[];
    
    StartingCharacter: GameProgressArmorGroup[];
    GameProgressConditions: GameProgressArmorGroup[];
    
    ArmorSets: ArmorCombination[]; 
    SeparateArmorPieces: ArmorCombination[]; 
    
    LargestPieceId: number;
    LargestSetId: number;
   
    HeadSeparatePieces: ArmorPiece[];
    ChestSeparatePieces: ArmorPiece[];
    ArmsSeparatePieces: ArmorPiece[];
    LegsSeparatePieces: ArmorPiece[];
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
    
    AvailableWeight: number = 100;
    ResultListLength: number = 10;
    
    SelectedCharacter: GameProgressArmorGroup;
    PreviousCharacter:  GameProgressArmorGroup;    
    
    constructor(public ArmoryData: ArmoryData) {
        this.Head = ArmoryData.Head;
        this.Chest = ArmoryData.Chest;
        this.Arms = ArmoryData.Arms;
        this.Legs = ArmoryData.Legs;
        
        this.StartingCharacter = ArmoryData.StartingCharacter;
        this.GameProgressConditions = ArmoryData.GameProgressConditions;
  
        this.Init_FindAndSetLargestIds();
         
        this.Init_FormAllSets();
        
        this.Init_FormSeparatePieceArrays();
        
        this.Minimums = new OptimizationParameters();  
        this.Weights = new OptimizationParameters();
        
        this.Weights.Strike = 1;
        this.Weights.Slash = 1;
        this.Weights.Thrust = 1; 
        
        this.SelectedCharacter = this.StartingCharacter[0];
        this.SelectedCharacter.Enabled = true;

        
        this.PreviousCharacter = this.StartingCharacter[0];
                            
    }
    
    private Init_FindAndSetLargestIds() {
        
        let LargestPieceId = 0;
        let LargestSetId = 0;
        
        for(var i = 1; i < this.Head.length; i++) {
            if(this.Head[i].PieceId > LargestPieceId)
                LargestPieceId = this.Head[i].PieceId;
                
            if(this.Head[i].SetId > LargestSetId)
                LargestSetId = this.Head[i].SetId;                                       
        } 
        for(var i = 1; i < this.Chest.length; i++) {
            if(this.Chest[i].PieceId > LargestPieceId)
                LargestPieceId = this.Chest[i].PieceId;
                
            if(this.Chest[i].SetId > LargestSetId)
                LargestSetId = this.Chest[i].SetId;                         
        } 
        for(var i = 1; i < this.Arms.length; i++) {
            if(this.Arms[i].PieceId > LargestPieceId)
                LargestPieceId = this.Arms[i].PieceId;
                
            if(this.Arms[i].SetId > LargestSetId)
                LargestSetId = this.Arms[i].SetId;  
        } 
        for(var i = 1; i < this.Legs.length; i++) {
            if(this.Legs[i].PieceId > LargestPieceId)
                LargestPieceId = this.Legs[i].PieceId;
                
            if(this.Legs[i].SetId > LargestSetId)
                LargestSetId = this.Legs[i].SetId;  
        }
        
        this.LargestPieceId = LargestPieceId;
        this.LargestSetId = LargestSetId;          
    }
    
    private Init_FormAllSets() {
        
        let ACF: ArmorCombinationFactory = new ArmorCombinationFactory(null);
        
        this.ArmorSets = []; 
        
        for(var SetId = 1; SetId <= this.LargestSetId; SetId++) {
            
            //The none piece
            let Head: ArmorPiece = this.Head[0];
            
            for(var i = 1; i < this.Head.length; i++) {
                if(this.Head[i].SetId == SetId) {
                    Head = this.Head[i]; 
                    break;
                }                                          
            }
            
            //The none piece
            let Chest: ArmorPiece = this.Chest[0];
            
            for(var i = 1; i < this.Chest.length; i++) {
                if(this.Chest[i].SetId == SetId) {
                    Chest = this.Chest[i]; 
                    break;
                }                                          
            }
            
            //The none piece
            let Arms: ArmorPiece = this.Arms[0];
            
            for(var i = 1; i < this.Arms.length; i++) {
                if(this.Arms[i].SetId == SetId) {
                    Arms = this.Arms[i]; 
                    break;
                }                                          
            }
            
            //The none piece
            let Legs: ArmorPiece = this.Legs[0];
            
            for(var i = 1; i < this.Legs.length; i++) {
                if(this.Legs[i].SetId == SetId) {
                    Legs = this.Legs[i]; 
                    break;
                }                                          
            }
                          
            this.ArmorSets.push(ACF.Combine(Head, Chest, Arms, Legs));

        }
        
        this.ArmorSets.sort((a: ArmorCombination, b: ArmorCombination) => { return a.Head.Name.localeCompare(b.Head.Name); });        
    }
    
    private Init_FormSeparatePieceArrays() {
        
        this.HeadSeparatePieces = [];
        this.ChestSeparatePieces = [];
        this.ArmsSeparatePieces = [];
        this.LegsSeparatePieces = [];
        
        for(var i = 1; i < this.Head.length; i++) {
            if(this.Head[i].SetId == 0)
                this.HeadSeparatePieces.push(this.Head[i]);
        }
        this.HeadSeparatePieces.sort((a: ArmorPiece, b: ArmorPiece) => { return a.Name.localeCompare(b.Name); });
        
        for(var i = 1; i < this.Chest.length; i++) {
            if(this.Chest[i].SetId == 0)
                this.ChestSeparatePieces.push(this.Chest[i]);
        }
        this.ChestSeparatePieces.sort((a: ArmorPiece, b: ArmorPiece) => { return a.Name.localeCompare(b.Name); });
        
        for(var i = 1; i < this.Arms.length; i++) {
            if(this.Arms[i].SetId == 0)
                this.ArmsSeparatePieces.push(this.Arms[i]);
        }
        this.ArmsSeparatePieces.sort((a: ArmorPiece, b: ArmorPiece) => { return a.Name.localeCompare(b.Name); });
        
        for(var i = 1; i < this.Legs.length; i++) {
            if(this.Legs[i].SetId == 0)
                this.LegsSeparatePieces.push(this.Legs[i]);
        }
        this.LegsSeparatePieces.sort((a: ArmorPiece, b: ArmorPiece) => { return a.Name.localeCompare(b.Name); });                        
               
    }
    
    EnableDisableArmorSet(SetId: number, Setting: boolean) {
        
        let Combo: ArmorCombination;
        
        for(var i = 0; i <= this.ArmorSets.length; i++) {
            if( this.ArmorSets[i].Head.SetId == SetId || 
                this.ArmorSets[i].Chest.SetId == SetId ||
                this.ArmorSets[i].Arms.SetId == SetId ||
                this.ArmorSets[i].Legs.SetId == SetId) {
                    Combo = this.ArmorSets[i];
                    break;
                }        
        }
        if(Combo.Head.SetId == SetId)
            Combo.Head.Enabled = Setting;
        if(Combo.Chest.SetId == SetId)
            Combo.Chest.Enabled = Setting;
        if(Combo.Arms.SetId == SetId)
            Combo.Arms.Enabled = Setting;                        
        if(Combo.Legs.SetId == SetId)
            Combo.Legs.Enabled = Setting;        
    }
    
    
    EnableArmorGroup(Group: GameProgressArmorGroup) {
        if(Group.ArmorPiecesIds != null) {
            for(var i = 0; i < this.Head.length; i++) {
                for(var j = 0; j < Group.ArmorPiecesIds.length; j++) {
                    if(this.Head[i].PieceId == Group.ArmorPiecesIds[j]) {
                        this.Head[i].Enabled = true;
                    }
                }
            }
            for(var i = 0; i < this.Chest.length; i++) {
                for(var j = 0; j < Group.ArmorPiecesIds.length; j++) {
                    if(this.Chest[i].PieceId == Group.ArmorPiecesIds[j]) {
                        this.Chest[i].Enabled = true;
                    }
                }
            }
            for(var i = 0; i < this.Arms.length; i++) {
                for(var j = 0; j < Group.ArmorPiecesIds.length; j++) {
                    if(this.Arms[i].PieceId == Group.ArmorPiecesIds[j]) {
                        this.Arms[i].Enabled = true;
                    }
                }
            }
            for(var i = 0; i < this.Legs.length; i++) {
                for(var j = 0; j < Group.ArmorPiecesIds.length; j++) {
                    if(this.Legs[i].PieceId == Group.ArmorPiecesIds[j]) {
                        this.Legs[i].Enabled = true;
                    }
                }
            }                                    
              
        }
        
        if(Group.ArmorSetIds != null) {
            for(var i = 0; i < this.Head.length; i++) {
                for(var j = 0; j < Group.ArmorSetIds.length; j++) {
                    if(this.Head[i].SetId == Group.ArmorSetIds[j]) {
                        this.Head[i].Enabled = true;
                    }
                }
            }
            for(var i = 0; i < this.Chest.length; i++) {
                for(var j = 0; j < Group.ArmorSetIds.length; j++) {
                    if(this.Chest[i].SetId == Group.ArmorSetIds[j]) {
                        this.Chest[i].Enabled = true;
                    }
                }
            }
            for(var i = 0; i < this.Arms.length; i++) {
                for(var j = 0; j < Group.ArmorSetIds.length; j++) {
                    if(this.Arms[i].SetId == Group.ArmorSetIds[j]) {
                        this.Arms[i].Enabled = true;
                    }
                }
            }
            for(var i = 0; i < this.Legs.length; i++) {
                for(var j = 0; j < Group.ArmorSetIds.length; j++) {
                    if(this.Legs[i].SetId == Group.ArmorSetIds[j]) {
                        this.Legs[i].Enabled = true;
                    }
                }
            }                                    
              
        }       
   
    }
    
    
    CountHeadArmor(): number{
        let result = 0;      
        for(var i = 0; i < this.Head.length; i++){
            if(this.Head[i].Enabled)
                result++;
        }       
        return result; 
    }
    
    FindPieceByPieceId(PieceId: number): ArmorPiece {
            
            for(var i = 1; i < this.Head.length; i++) {
                if(this.Head[i].PieceId == PieceId) {
                    return this.Head[i]; 
                }                                          
            }
            for(var i = 1; i < this.Chest.length; i++) {
                if(this.Chest[i].PieceId == PieceId) {
                    return this.Chest[i]; 
                }                                          
            } 
            for(var i = 1; i < this.Arms.length; i++) {
                if(this.Arms[i].PieceId == PieceId) {
                    return this.Arms[i]; 
                }                                          
            } 
            for(var i = 1; i < this.Legs.length; i++) {
                if(this.Legs[i].PieceId == PieceId) {
                    return this.Legs[i]; 
                }                                          
            }             
                   
    }
    
    TryToCancelArmorGroup(Group: GameProgressArmorGroup, PossibleConflictGroups: GameProgressArmorGroup[]){
        //if canceling a piece, we can't if a) there is an enabled Bonfire with that piece id. or b> there is an enabled Bonfire with a set with same setid.
        //thus need setid of piece as well.  
        //if cancelling a set, we canf't if a) there is an enabled Bonfire with that classid => after that have to check each piece.

        //So in either case, first check if set is enabled as a set. If so, can't
        
        //Then need to check each piece sepratly for seprate pieceid enabled.
        
        if(Group.ArmorPiecesIds != null) {
            for(var i = 0; i < Group.ArmorPiecesIds.length; i++){
                this.TryToCancelArmorPiece(this.FindPieceByPieceId(Group.ArmorPiecesIds[i]), PossibleConflictGroups);
            }
        }
        
        if(Group.ArmorSetIds != null) {
            for(var j = 0; j < Group.ArmorSetIds.length; j++){
                
                for(var i = 1; i < this.Head.length; i++) {
                    if(this.Head[i].SetId == Group.ArmorSetIds[j]) {
                        this.TryToCancelArmorPiece(this.Head[i], PossibleConflictGroups);
                    }                                          
                }        
                for(var i = 1; i < this.Chest.length; i++) {
                    if(this.Chest[i].SetId == Group.ArmorSetIds[j]) {
                        this.TryToCancelArmorPiece(this.Chest[i], PossibleConflictGroups);
                    }                                         
                }          
                for(var i = 1; i < this.Arms.length; i++) {
                    if(this.Arms[i].SetId == Group.ArmorSetIds[j]) {
                        this.TryToCancelArmorPiece(this.Arms[i], PossibleConflictGroups);
                    }                                          
                }
                for(var i = 1; i < this.Legs.length; i++) {
                    if(this.Legs[i].SetId == Group.ArmorSetIds[j]) {
                        this.TryToCancelArmorPiece(this.Legs[i], PossibleConflictGroups);
                    }                                          
                }            
            }        
        }
    }
    
    
    TryToCancelArmorPiece(Piece: ArmorPiece, PossibleConflictGroups: GameProgressArmorGroup[]) {
        
        for(var i = 0; i < PossibleConflictGroups.length; i++){
            if(PossibleConflictGroups[i].Enabled == false)
                continue;
            
            if(PossibleConflictGroups[i].ArmorSetIds != null) {
                for(var j = 0; j < PossibleConflictGroups[i].ArmorSetIds.length; j++){
                    if(PossibleConflictGroups[i].ArmorSetIds[j] == Piece.SetId)
                        return; //There is an explictly enabled set with this piece id.
                }
            }
            if(PossibleConflictGroups[i].ArmorPiecesIds != null) {
                for(var j = 0; j < PossibleConflictGroups[i].ArmorPiecesIds.length; j++){
                    if(PossibleConflictGroups[i].ArmorPiecesIds[j] == Piece.PieceId)
                        return; //This piece has been explictly enabled.
                } 
            }           
        }
        
        //Can cancle it.
        Piece.Enabled = false;       
        
    }
    
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

export class ArmorCombination implements ISortable {
    
    Metric: number;
    
    constructor(public Head: ArmorPiece, public Chest: ArmorPiece, public Arms: ArmorPiece, public Legs: ArmorPiece) {
        this.Weight = Head.Weight + Chest.Weight + Arms.Weight + Legs.Weight;
        
        
        this.Strike = 1 - (1 - Head.Strike / 100) * (1 - Chest.Strike / 100) * (1 - Arms.Strike / 100) * (1 - Legs.Strike / 100);
        this.Slash = 1 - (1 - Head.Slash / 100) * (1 - Chest.Slash / 100) * (1 - Arms.Slash / 100) * (1 - Legs.Slash / 100);
        this.Thrust = 1 - (1 - Head.Thrust / 100) * (1 - Chest.Thrust / 100) * (1 - Arms.Thrust / 100) * (1 - Legs.Thrust / 100);
        
        this.PhysicalAverage = (this.Strike + this.Slash + this.Thrust) / 3;
        
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

    PhysicalAverage: number;
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

export class ArmorCombinationFactory{
    
    constructor(public MetricWeights: OptimizationParameters){        
    }
    
    Combine(Head: ArmorPiece, Chest: ArmorPiece, Arms: ArmorPiece, Legs: ArmorPiece) : ArmorCombination {
        let result: ArmorCombination = new ArmorCombination(Head, Chest, Arms, Legs);
        
        if(this.MetricWeights != null) {
            result.Metric = 
            //this.MetricWeights.Physical * result.Physical +
            this.MetricWeights.Strike * result.Strike +
            this.MetricWeights.Slash * result.Slash +
            this.MetricWeights.Thrust * result.Thrust +
            
            this.MetricWeights.Magic * result.Magic +
            this.MetricWeights.Fire * result.Fire +
            this.MetricWeights.Lightning * result.Lightning +
            this.MetricWeights.Dark * result.Dark +
            
            this.MetricWeights.Bleed * result.Bleed +
            this.MetricWeights.Poison * result.Poison +
            this.MetricWeights.Frost * result.Frost +
            this.MetricWeights.Curse * result.Curse +
            
            this.MetricWeights.Poise * result.Poise;
        }
        else {
            result.Metric = null;
        }
       
        return result;       
    }
    
}

export class OptimizationParameters {
    
    //Physical: number = 0;
    PhysicalAverage: number = 0;
    
    Strike: number = 0;
    Slash: number = 0;
    Thrust: number = 0;

    Magic: number = 0;
    Fire: number = 0;
    Lightning: number = 0;
    Dark: number = 0;

    Bleed: number = 0;
    Poison: number = 0;
    Frost: number = 0;
    Curse: number = 0;

    Poise: number = 0; 
}


export class GameProgressArmorGroup {
    Enabled: boolean;
    
    ProgressCondition: string;
    
    ArmorSetIds: number[];
    ArmorPiecesIds: number[];
}

