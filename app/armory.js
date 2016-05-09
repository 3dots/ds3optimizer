"use strict";
var ArmoryData = (function () {
    function ArmoryData() {
    }
    return ArmoryData;
}());
exports.ArmoryData = ArmoryData;
var Armory = (function () {
    function Armory(ArmoryData) {
        this.ArmoryData = ArmoryData;
        this.Head = ArmoryData.Head;
        this.Chest = ArmoryData.Chest;
        this.Arms = ArmoryData.Arms;
        this.Legs = ArmoryData.Legs;
        this.StartingCharacter = ArmoryData.StartingCharacter;
        this.GameProgressConditions = ArmoryData.GameProgressConditions;
        this.Init_FindAndSetLargestIds();
        this.Init_FormAllSets();
        this.Init_FormSeparatePieceArrays();
        /*
        for(var i = 1; i < this.Head.length; i++) {
            this.Head[i].Enabled = false;
        }
        for(var i = 1; i < this.Chest.length; i++) {
            this.Chest[i].Enabled = false;
        }
        for(var i = 1; i < this.Arms.length; i++) {
            this.Arms[i].Enabled = false;
        }
        for(var i = 1; i < this.Legs.length; i++) {
            this.Legs[i].Enabled = false;
        }
      
        //Temp Code
        
        for(var i = 0; i < 10; i++){
            this.EnableArmorGroup(this.GameProgressConditions[i]);
        }
        */
    }
    Armory.prototype.Init_FindAndSetLargestIds = function () {
        var LargestPieceId = 0;
        var LargestSetId = 0;
        for (var i = 1; i < this.Head.length; i++) {
            if (this.Head[i].PieceId > LargestPieceId)
                LargestPieceId = this.Head[i].PieceId;
            if (this.Head[i].SetId > LargestSetId)
                LargestSetId = this.Head[i].SetId;
        }
        for (var i = 1; i < this.Chest.length; i++) {
            if (this.Chest[i].PieceId > LargestPieceId)
                LargestPieceId = this.Chest[i].PieceId;
            if (this.Chest[i].SetId > LargestSetId)
                LargestSetId = this.Chest[i].SetId;
        }
        for (var i = 1; i < this.Arms.length; i++) {
            if (this.Arms[i].PieceId > LargestPieceId)
                LargestPieceId = this.Arms[i].PieceId;
            if (this.Arms[i].SetId > LargestSetId)
                LargestSetId = this.Arms[i].SetId;
        }
        for (var i = 1; i < this.Legs.length; i++) {
            if (this.Legs[i].PieceId > LargestPieceId)
                LargestPieceId = this.Legs[i].PieceId;
            if (this.Legs[i].SetId > LargestSetId)
                LargestSetId = this.Legs[i].SetId;
        }
        this.LargestPieceId = LargestPieceId;
        this.LargestSetId = LargestSetId;
    };
    Armory.prototype.Init_FormAllSets = function () {
        var ACF = new ArmorCombinationFactory(null);
        this.ArmorSets = [];
        for (var SetId = 1; SetId <= this.LargestSetId; SetId++) {
            //The none piece
            var Head = this.Head[0];
            for (var i = 1; i < this.Head.length; i++) {
                if (this.Head[i].SetId == SetId) {
                    Head = this.Head[i];
                    break;
                }
            }
            //The none piece
            var Chest = this.Chest[0];
            for (var i = 1; i < this.Chest.length; i++) {
                if (this.Chest[i].SetId == SetId) {
                    Chest = this.Chest[i];
                    break;
                }
            }
            //The none piece
            var Arms = this.Arms[0];
            for (var i = 1; i < this.Arms.length; i++) {
                if (this.Arms[i].SetId == SetId) {
                    Arms = this.Arms[i];
                    break;
                }
            }
            //The none piece
            var Legs = this.Legs[0];
            for (var i = 1; i < this.Legs.length; i++) {
                if (this.Legs[i].SetId == SetId) {
                    Legs = this.Legs[i];
                    break;
                }
            }
            this.ArmorSets.push(ACF.Combine(Head, Chest, Arms, Legs));
        }
        this.ArmorSets.sort(function (a, b) { return a.Head.Name.localeCompare(b.Head.Name); });
    };
    Armory.prototype.Init_FormSeparatePieceArrays = function () {
        this.HeadSeparatePieces = [];
        this.ChestSeparatePieces = [];
        this.ArmsSeparatePieces = [];
        this.LegsSeparatePieces = [];
        for (var i = 1; i < this.Head.length; i++) {
            if (this.Head[i].SetId == 0)
                this.HeadSeparatePieces.push(this.Head[i]);
        }
        this.HeadSeparatePieces.sort(function (a, b) { return a.Name.localeCompare(b.Name); });
        for (var i = 1; i < this.Chest.length; i++) {
            if (this.Chest[i].SetId == 0)
                this.ChestSeparatePieces.push(this.Chest[i]);
        }
        this.ChestSeparatePieces.sort(function (a, b) { return a.Name.localeCompare(b.Name); });
        for (var i = 1; i < this.Arms.length; i++) {
            if (this.Arms[i].SetId == 0)
                this.ArmsSeparatePieces.push(this.Arms[i]);
        }
        this.ArmsSeparatePieces.sort(function (a, b) { return a.Name.localeCompare(b.Name); });
        for (var i = 1; i < this.Legs.length; i++) {
            if (this.Legs[i].SetId == 0)
                this.LegsSeparatePieces.push(this.Legs[i]);
        }
        this.LegsSeparatePieces.sort(function (a, b) { return a.Name.localeCompare(b.Name); });
    };
    Armory.prototype.EnableDisableArmorSet = function (SetId, Setting) {
        var Combo;
        for (var i = 0; i <= this.ArmorSets.length; i++) {
            if (this.ArmorSets[i].Head.SetId == SetId ||
                this.ArmorSets[i].Chest.SetId == SetId ||
                this.ArmorSets[i].Arms.SetId == SetId ||
                this.ArmorSets[i].Legs.SetId == SetId) {
                Combo = this.ArmorSets[i];
                break;
            }
        }
        if (Combo.Head.SetId == SetId)
            Combo.Head.Enabled = Setting;
        if (Combo.Chest.SetId == SetId)
            Combo.Chest.Enabled = Setting;
        if (Combo.Arms.SetId == SetId)
            Combo.Arms.Enabled = Setting;
        if (Combo.Legs.SetId == SetId)
            Combo.Legs.Enabled = Setting;
    };
    Armory.prototype.EnableArmorGroup = function (Group) {
        if (Group.ArmorPiecesIds != null) {
            for (var i = 0; i < this.Head.length; i++) {
                for (var j = 0; j < Group.ArmorPiecesIds.length; j++) {
                    if (this.Head[i].PieceId == Group.ArmorPiecesIds[j]) {
                        this.Head[i].Enabled = true;
                    }
                }
            }
            for (var i = 0; i < this.Chest.length; i++) {
                for (var j = 0; j < Group.ArmorPiecesIds.length; j++) {
                    if (this.Chest[i].PieceId == Group.ArmorPiecesIds[j]) {
                        this.Chest[i].Enabled = true;
                    }
                }
            }
            for (var i = 0; i < this.Arms.length; i++) {
                for (var j = 0; j < Group.ArmorPiecesIds.length; j++) {
                    if (this.Arms[i].PieceId == Group.ArmorPiecesIds[j]) {
                        this.Arms[i].Enabled = true;
                    }
                }
            }
            for (var i = 0; i < this.Legs.length; i++) {
                for (var j = 0; j < Group.ArmorPiecesIds.length; j++) {
                    if (this.Legs[i].PieceId == Group.ArmorPiecesIds[j]) {
                        this.Legs[i].Enabled = true;
                    }
                }
            }
        }
        if (Group.ArmorSetIds != null) {
            for (var i = 0; i < this.Head.length; i++) {
                for (var j = 0; j < Group.ArmorSetIds.length; j++) {
                    if (this.Head[i].SetId == Group.ArmorSetIds[j]) {
                        this.Head[i].Enabled = true;
                    }
                }
            }
            for (var i = 0; i < this.Chest.length; i++) {
                for (var j = 0; j < Group.ArmorSetIds.length; j++) {
                    if (this.Chest[i].SetId == Group.ArmorSetIds[j]) {
                        this.Chest[i].Enabled = true;
                    }
                }
            }
            for (var i = 0; i < this.Arms.length; i++) {
                for (var j = 0; j < Group.ArmorSetIds.length; j++) {
                    if (this.Arms[i].SetId == Group.ArmorSetIds[j]) {
                        this.Arms[i].Enabled = true;
                    }
                }
            }
            for (var i = 0; i < this.Legs.length; i++) {
                for (var j = 0; j < Group.ArmorSetIds.length; j++) {
                    if (this.Legs[i].SetId == Group.ArmorSetIds[j]) {
                        this.Legs[i].Enabled = true;
                    }
                }
            }
        }
    };
    Armory.prototype.CountHeadArmor = function () {
        var result = 0;
        for (var i = 0; i < this.Head.length; i++) {
            if (this.Head[i].Enabled)
                result++;
        }
        return result;
    };
    Armory.prototype.FindPieceByPieceId = function (PieceId) {
        for (var i = 1; i < this.Head.length; i++) {
            if (this.Head[i].PieceId == PieceId) {
                return this.Head[i];
            }
        }
        for (var i = 1; i < this.Chest.length; i++) {
            if (this.Chest[i].PieceId == PieceId) {
                return this.Chest[i];
            }
        }
        for (var i = 1; i < this.Arms.length; i++) {
            if (this.Arms[i].PieceId == PieceId) {
                return this.Arms[i];
            }
        }
        for (var i = 1; i < this.Legs.length; i++) {
            if (this.Legs[i].PieceId == PieceId) {
                return this.Legs[i];
            }
        }
    };
    Armory.prototype.TryToCancelArmorGroup = function (Group, PossibleConflictGroups) {
        //if canceling a piece, we can't if a) there is an enabled Bonfire with that piece id. or b> there is an enabled Bonfire with a set with same setid.
        //thus need setid of piece as well.  
        //if cancelling a set, we canf't if a) there is an enabled Bonfire with that classid => after that have to check each piece.
        //So in either case, first check if set is enabled as a set. If so, can't
        //Then need to check each piece sepratly for seprate pieceid enabled.
        if (Group.ArmorPiecesIds != null) {
            for (var i = 0; i < Group.ArmorPiecesIds.length; i++) {
                this.TryToCancelArmorPiece(this.FindPieceByPieceId(Group.ArmorPiecesIds[i]), PossibleConflictGroups);
            }
        }
        if (Group.ArmorSetIds != null) {
            for (var j = 0; j < Group.ArmorSetIds.length; j++) {
                for (var i = 1; i < this.Head.length; i++) {
                    if (this.Head[i].SetId == Group.ArmorSetIds[j]) {
                        this.TryToCancelArmorPiece(this.Head[i], PossibleConflictGroups);
                    }
                }
                for (var i = 1; i < this.Chest.length; i++) {
                    if (this.Chest[i].SetId == Group.ArmorSetIds[j]) {
                        this.TryToCancelArmorPiece(this.Chest[i], PossibleConflictGroups);
                    }
                }
                for (var i = 1; i < this.Arms.length; i++) {
                    if (this.Arms[i].SetId == Group.ArmorSetIds[j]) {
                        this.TryToCancelArmorPiece(this.Arms[i], PossibleConflictGroups);
                    }
                }
                for (var i = 1; i < this.Legs.length; i++) {
                    if (this.Legs[i].SetId == Group.ArmorSetIds[j]) {
                        this.TryToCancelArmorPiece(this.Legs[i], PossibleConflictGroups);
                    }
                }
            }
        }
    };
    Armory.prototype.TryToCancelArmorPiece = function (Piece, PossibleConflictGroups) {
        for (var i = 0; i < PossibleConflictGroups.length; i++) {
            if (PossibleConflictGroups[i].Enabled == false)
                continue;
            if (PossibleConflictGroups[i].ArmorSetIds != null) {
                for (var j = 0; j < PossibleConflictGroups[i].ArmorSetIds.length; j++) {
                    if (PossibleConflictGroups[i].ArmorSetIds[j] == Piece.SetId)
                        return; //There is an explictly enabled set with this piece id.
                }
            }
            if (PossibleConflictGroups[i].ArmorPiecesIds != null) {
                for (var j = 0; j < PossibleConflictGroups[i].ArmorPiecesIds.length; j++) {
                    if (PossibleConflictGroups[i].ArmorPiecesIds[j] == Piece.PieceId)
                        return; //This piece has been explictly enabled.
                }
            }
        }
        //Can cancle it.
        Piece.Enabled = false;
    };
    return Armory;
}());
exports.Armory = Armory;
var ArmorPiece = (function () {
    function ArmorPiece() {
    }
    return ArmorPiece;
}());
exports.ArmorPiece = ArmorPiece;
var ArmorCombination = (function () {
    function ArmorCombination(Head, Chest, Arms, Legs) {
        this.Head = Head;
        this.Chest = Chest;
        this.Arms = Arms;
        this.Legs = Legs;
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
    return ArmorCombination;
}());
exports.ArmorCombination = ArmorCombination;
var ArmorCombinationFactory = (function () {
    function ArmorCombinationFactory(MetricWeights) {
        this.MetricWeights = MetricWeights;
    }
    ArmorCombinationFactory.prototype.Combine = function (Head, Chest, Arms, Legs) {
        var result = new ArmorCombination(Head, Chest, Arms, Legs);
        if (this.MetricWeights != null) {
            result.Metric =
                this.MetricWeights.Physical * result.Physical +
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
    };
    return ArmorCombinationFactory;
}());
exports.ArmorCombinationFactory = ArmorCombinationFactory;
var OptimizationParameters = (function () {
    function OptimizationParameters() {
        this.Physical = 0;
        this.Strike = 0;
        this.Slash = 0;
        this.Thrust = 0;
        this.Magic = 0;
        this.Fire = 0;
        this.Lightning = 0;
        this.Dark = 0;
        this.Bleed = 0;
        this.Poison = 0;
        this.Frost = 0;
        this.Curse = 0;
        this.Poise = 0;
    }
    return OptimizationParameters;
}());
exports.OptimizationParameters = OptimizationParameters;
var GameProgressArmorGroup = (function () {
    function GameProgressArmorGroup() {
    }
    return GameProgressArmorGroup;
}());
exports.GameProgressArmorGroup = GameProgressArmorGroup;
//# sourceMappingURL=armory.js.map