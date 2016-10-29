"use strict";
//import { IGameProgressComponentContext } from './game.progress.component';
//IGameProgressComponentContext
var Armory = (function () {
    function Armory(ArmoryData) {
        this.ArmoryData = ArmoryData;
        //Data      
        this.Head = ArmoryData.Head;
        this.Chest = ArmoryData.Chest;
        this.Arms = ArmoryData.Arms;
        this.Legs = ArmoryData.Legs;
        //this.StartingCharacter = ArmoryData.StartingCharacter;
        //this.GameProgressConditions = ArmoryData.GameProgressConditions;
        this.RingData = ArmoryData.Rings;
        //Optimizer Component UI             
        this._Vitality = 10;
        this._FractionGoal = 0.7;
        this.RightWeapons = [0, 0, 0];
        this.LeftWeapons = [0, 0, 0];
        this.RingsEquipped = [this.RingData[0], this.RingData[0], this.RingData[0], this.RingData[0]];
        this.UpdateTotalWeights(); //initial AvailableWeight and TotalWeight
        this.ResultListLength = 10;
        this.Minimums = new OptimizationParameters();
        this.Weights = new OptimizationParameters();
        this.Weights.Physical = 1;
        this.Weights.Strike = 1;
        this.Weights.Slash = 1;
        this.Weights.Thrust = 1;
        //Armor Selections Component UI
        this.Init_FindAndSetLargestIds();
        this.Init_FormAllSets();
        //this.Init_FormSeparatePieceArrays();
        //Game Progress Component UI
        this.SelectedCharacter = null;
        this.PreviousCharacter = null;
        this.InnatePoise = 0;
    }
    Object.defineProperty(Armory.prototype, "Vitality", {
        get: function () {
            return this._Vitality;
        },
        set: function (newValue) {
            this._Vitality = newValue;
            this.UpdateTotalWeights();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Armory.prototype, "FractionGoal", {
        get: function () {
            return this._FractionGoal;
        },
        set: function (newValue) {
            this._FractionGoal = newValue;
            this.UpdateTotalWeights();
        },
        enumerable: true,
        configurable: true
    });
    //Optimizer Component UI
    Armory.prototype.UpdateTotalWeights = function () {
        this.TotalWeight =
            ((50 + this.Vitality - 10) +
                (this.RingsEquipped[0].VitalityModifier != null ? this.RingsEquipped[0].VitalityModifier : 0) +
                (this.RingsEquipped[1].VitalityModifier != null ? this.RingsEquipped[1].VitalityModifier : 0) +
                (this.RingsEquipped[2].VitalityModifier != null ? this.RingsEquipped[2].VitalityModifier : 0) +
                (this.RingsEquipped[3].VitalityModifier != null ? this.RingsEquipped[3].VitalityModifier : 0)) *
                (this.RingsEquipped[0].ProductModfier != null ? this.RingsEquipped[0].ProductModfier : 1) *
                (this.RingsEquipped[1].ProductModfier != null ? this.RingsEquipped[1].ProductModfier : 1) *
                (this.RingsEquipped[2].ProductModfier != null ? this.RingsEquipped[2].ProductModfier : 1) *
                (this.RingsEquipped[3].ProductModfier != null ? this.RingsEquipped[3].ProductModfier : 1);
        this.AvailableWeight =
            this.TotalWeight * this.FractionGoal -
                this.RightWeapons[0] - this.RightWeapons[1] - this.RightWeapons[2] -
                this.LeftWeapons[0] - this.LeftWeapons[1] - this.LeftWeapons[2] -
                this.RingsEquipped[0].Weight - this.RingsEquipped[1].Weight - this.RingsEquipped[2].Weight - this.RingsEquipped[3].Weight;
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
    //IOptimizertContext        
    Armory.prototype.CountHeadArmor = function () {
        var result = 0;
        for (var i = 0; i < this.Head.length; i++) {
            if (this.Head[i].Enabled)
                result++;
        }
        return result;
    };
    //Armor Selections Component UI
    Armory.prototype.Init_FindAndSetLargestIds = function () {
        var LargestPieceId = 0;
        var LargestSetId = 0;
        for (var i = 1; i < this.Head.length; i++) {
            // if(this.Head[i].PieceId > LargestPieceId)
            //     LargestPieceId = this.Head[i].PieceId;
            if (this.Head[i].SetId > LargestSetId)
                LargestSetId = this.Head[i].SetId;
        }
        for (var i = 1; i < this.Chest.length; i++) {
            // if(this.Chest[i].PieceId > LargestPieceId)
            //     LargestPieceId = this.Chest[i].PieceId;
            if (this.Chest[i].SetId > LargestSetId)
                LargestSetId = this.Chest[i].SetId;
        }
        for (var i = 1; i < this.Arms.length; i++) {
            // if(this.Arms[i].PieceId > LargestPieceId)
            //     LargestPieceId = this.Arms[i].PieceId;
            if (this.Arms[i].SetId > LargestSetId)
                LargestSetId = this.Arms[i].SetId;
        }
        for (var i = 1; i < this.Legs.length; i++) {
            // if(this.Legs[i].PieceId > LargestPieceId)
            //     LargestPieceId = this.Legs[i].PieceId;
            if (this.Legs[i].SetId > LargestSetId)
                LargestSetId = this.Legs[i].SetId;
        }
        //this.LargestPieceId = LargestPieceId;
        this.LargestSetId = LargestSetId;
    };
    Armory.prototype.Init_FormAllSets = function () {
        var ACF = new ArmorCombinationFactory(null, 0);
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
    return Armory;
}());
exports.Armory = Armory;
var ArmoryData = (function () {
    function ArmoryData() {
    }
    return ArmoryData;
}());
exports.ArmoryData = ArmoryData;
var Ring = (function () {
    function Ring() {
    }
    return Ring;
}());
exports.Ring = Ring;
var ArmorPiece = (function () {
    function ArmorPiece() {
    }
    return ArmorPiece;
}());
exports.ArmorPiece = ArmorPiece;
var ArmorCombination = (function () {
    function ArmorCombination(Head, Chest, Arms, Legs, InnatePoise) {
        this.Head = Head;
        this.Chest = Chest;
        this.Arms = Arms;
        this.Legs = Legs;
        this.InnatePoise = InnatePoise;
        this.Weight = Head.Weight + Chest.Weight + Arms.Weight + Legs.Weight;
        this.Physical = 1 - (1 - Head.Physical / 100) * (1 - Chest.Physical / 100) * (1 - Arms.Physical / 100) * (1 - Legs.Physical / 100);
        this.Strike = 1 - (1 - Head.Strike / 100) * (1 - Chest.Strike / 100) * (1 - Arms.Strike / 100) * (1 - Legs.Strike / 100);
        this.Slash = 1 - (1 - Head.Slash / 100) * (1 - Chest.Slash / 100) * (1 - Arms.Slash / 100) * (1 - Legs.Slash / 100);
        this.Thrust = 1 - (1 - Head.Thrust / 100) * (1 - Chest.Thrust / 100) * (1 - Arms.Thrust / 100) * (1 - Legs.Thrust / 100);
        this.PhysicalAverage = (this.Physical + this.Strike + this.Slash + this.Thrust) / 4;
        this.Magic = 1 - (1 - Head.Magic / 100) * (1 - Chest.Magic / 100) * (1 - Arms.Magic / 100) * (1 - Legs.Magic / 100);
        this.Fire = 1 - (1 - Head.Fire / 100) * (1 - Chest.Fire / 100) * (1 - Arms.Fire / 100) * (1 - Legs.Fire / 100);
        this.Lightning = 1 - (1 - Head.Lightning / 100) * (1 - Chest.Lightning / 100) * (1 - Arms.Lightning / 100) * (1 - Legs.Lightning / 100);
        this.Dark = 1 - (1 - Head.Dark / 100) * (1 - Chest.Dark / 100) * (1 - Arms.Dark / 100) * (1 - Legs.Dark / 100);
        this.Bleed = Head.Bleed + Chest.Bleed + Arms.Bleed + Legs.Bleed;
        this.Poison = Head.Poison + Chest.Poison + Arms.Poison + Legs.Poison;
        this.Frost = Head.Frost + Chest.Frost + Arms.Frost + Legs.Frost;
        this.Curse = Head.Curse + Chest.Curse + Arms.Curse + Legs.Curse;
        //this.Poise = Head.Poise + Chest.Poise + Arms.Poise + Legs.Poise;
        this.Poise = InnatePoise;
        this.Poise = this.PoiseFormula(this.Poise, Head.Poise);
        this.Poise = this.PoiseFormula(this.Poise, Chest.Poise);
        this.Poise = this.PoiseFormula(this.Poise, Arms.Poise);
        this.Poise = this.PoiseFormula(this.Poise, Legs.Poise);
    }
    ArmorCombination.prototype.PoiseFormula = function (p1, p2) {
        return (p1 + p2 - p1 * p2 / 100);
    };
    return ArmorCombination;
}());
exports.ArmorCombination = ArmorCombination;
var ArmorCombinationFactory = (function () {
    function ArmorCombinationFactory(MetricWeights, InnatePoise) {
        this.MetricWeights = MetricWeights;
        this.InnatePoise = InnatePoise;
    }
    ArmorCombinationFactory.prototype.Combine = function (Head, Chest, Arms, Legs) {
        var result = new ArmorCombination(Head, Chest, Arms, Legs, this.InnatePoise);
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
        this.PhysicalAverage = 0;
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