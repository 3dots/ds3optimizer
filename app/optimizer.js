"use strict";
var armory_1 = require('./armory');
var doublylinkedlist_1 = require('./doublylinkedlist');
var OptimizationEngine = (function () {
    function OptimizationEngine(_ViewModel, Armory) {
        this._ViewModel = _ViewModel;
        this.Armory = Armory;
        this.ACF = new armory_1.ArmorCombinationFactory(this.Armory.Weights, this.Armory.InnatePoise);
        this.List = new doublylinkedlist_1.DoublyLinkedList(this.Armory.ResultListLength);
    }
    OptimizationEngine.prototype.ComputeOptimals = function () {
        this.Progress = 0;
        this._ViewModel.UpdateProgress(this.Progress);
        var HeadIterationCount = this.Armory.CountHeadArmor();
        this.ProgressIncrement = 100 * 1 / HeadIterationCount;
        //Warning: Hacks ensue. Turn back.
        this.ComputeOptimalsIncremental(0, this);
    };
    OptimizationEngine.prototype.ReturnResults = function (Context) {
        Context.Progress = 100;
        this._ViewModel.UpdateProgress(this.Progress);
        Context._ViewModel.RecieveResults(Context.List.ToArray());
    };
    OptimizationEngine.prototype.ComputeOptimalsIncremental = function (curHeadIndex, Context) {
        for (var ih = curHeadIndex; ih < Context.Armory.Head.length; ih++) {
            if (Context.Armory.Head[ih].Enabled == false)
                continue;
            if (Context.Armory.Head[ih].Weight > Context.Armory.AvailableWeight)
                continue;
            for (var ic = 0; ic < Context.Armory.Chest.length; ic++) {
                if (Context.Armory.Chest[ic].Enabled == false)
                    continue;
                if (Context.Armory.Head[ih].Weight + Context.Armory.Chest[ic].Weight > Context.Armory.AvailableWeight)
                    continue;
                for (var ia = 0; ia < Context.Armory.Arms.length; ia++) {
                    if (Context.Armory.Arms[ia].Enabled == false)
                        continue;
                    if (Context.Armory.Head[ih].Weight + Context.Armory.Chest[ic].Weight + Context.Armory.Arms[ia].Weight > Context.Armory.AvailableWeight)
                        continue;
                    for (var il = 0; il < Context.Armory.Legs.length; il++) {
                        if (Context.Armory.Legs[il].Enabled == false)
                            continue;
                        if (Context.Armory.Head[ih].Weight + Context.Armory.Chest[ic].Weight + Context.Armory.Arms[ia].Weight + Context.Armory.Legs[il].Weight > Context.Armory.AvailableWeight)
                            continue;
                        var combo = Context.ACF.Combine(Context.Armory.Head[ih], Context.Armory.Chest[ic], Context.Armory.Arms[ia], Context.Armory.Legs[il]);
                        if (combo.PhysicalAverage >= Context.Armory.Minimums.PhysicalAverage &&
                            combo.Physical >= Context.Armory.Minimums.Physical &&
                            combo.Strike >= Context.Armory.Minimums.Strike &&
                            combo.Slash >= Context.Armory.Minimums.Slash &&
                            combo.Thrust >= Context.Armory.Minimums.Thrust &&
                            combo.Magic >= Context.Armory.Minimums.Magic &&
                            combo.Fire >= Context.Armory.Minimums.Fire &&
                            combo.Lightning >= Context.Armory.Minimums.Lightning &&
                            combo.Dark >= Context.Armory.Minimums.Dark &&
                            combo.Bleed >= Context.Armory.Minimums.Bleed &&
                            combo.Poison >= Context.Armory.Minimums.Poison &&
                            combo.Frost >= Context.Armory.Minimums.Frost &&
                            combo.Curse >= Context.Armory.Minimums.Curse &&
                            combo.Poise >= Context.Armory.Minimums.Poise) {
                            Context.List.TryToAdd(combo);
                        }
                    }
                }
            }
            Context.Progress += Context.ProgressIncrement;
            Context._ViewModel.UpdateProgress(Math.floor(Context.Progress));
            ih++;
            setTimeout(Context.ComputeOptimalsIncremental, 1, ih, Context);
            //Leaving and letting Angular update the view with progress.
            if (ih < Context.Armory.Head.length)
                return;
        }
        Context.ReturnResults(Context);
    };
    return OptimizationEngine;
}());
exports.OptimizationEngine = OptimizationEngine;
//# sourceMappingURL=optimizer.js.map