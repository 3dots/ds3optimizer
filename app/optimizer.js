System.register(['./armory', './doublylinkedlist'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var armory_1, doublylinkedlist_1;
    var OptimizationEngine;
    return {
        setters:[
            function (armory_1_1) {
                armory_1 = armory_1_1;
            },
            function (doublylinkedlist_1_1) {
                doublylinkedlist_1 = doublylinkedlist_1_1;
            }],
        execute: function() {
            OptimizationEngine = (function () {
                //List: LinkedList<ArmorCombination>;
                function OptimizationEngine(_ViewModel) {
                    this._ViewModel = _ViewModel;
                    this.MaxWeight = _ViewModel.AvailableWeight;
                    this.MaxListLength = _ViewModel.ResultListLength;
                    this.Armory = _ViewModel.Armory;
                    this.Minimums = _ViewModel.Minimums;
                    this.ACF = new armory_1.ArmorCombinationFactory(_ViewModel.Weights);
                }
                OptimizationEngine.prototype.ComputeOptimals = function () {
                    var AM = new armory_1.ArmorMethods(this.Armory);
                    this._ViewModel.UpdateProgress(0);
                    var HeadIterationCount = AM.CountArmorInArray(this.Armory.Head);
                    var ProgressIncrement = 100 * 1 / HeadIterationCount;
                    var Progress = 0;
                    //traverse whole list, if satisfies conditions try to add to optimal Linked List
                    var List = new doublylinkedlist_1.DoublyLinkedList(this.MaxListLength);
                    for (var ih = 0; ih < this.Armory.Head.length; ih++) {
                        if (this.Armory.Head[ih].Enabled == false)
                            continue;
                        for (var ic = 0; ic < this.Armory.Chest.length; ic++) {
                            if (this.Armory.Chest[ic].Enabled == false)
                                continue;
                            for (var ia = 0; ia < this.Armory.Arms.length; ia++) {
                                if (this.Armory.Arms[ia].Enabled == false)
                                    continue;
                                for (var il = 0; il < this.Armory.Legs.length; il++) {
                                    if (this.Armory.Legs[il].Enabled == false)
                                        continue;
                                    if (this.Armory.Head[ih].Weight + this.Armory.Chest[ic].Weight + this.Armory.Arms[ia].Weight + this.Armory.Legs[il].Weight > this.MaxWeight)
                                        continue;
                                    var combo = this.ACF.Combine(this.Armory.Head[ih], this.Armory.Chest[ic], this.Armory.Arms[ia], this.Armory.Legs[il]);
                                    if (combo.Physical >= this.Minimums.Physical &&
                                        combo.Strike >= this.Minimums.Strike &&
                                        combo.Slash >= this.Minimums.Slash &&
                                        combo.Thrust >= this.Minimums.Thrust &&
                                        combo.Magic >= this.Minimums.Magic &&
                                        combo.Fire >= this.Minimums.Fire &&
                                        combo.Lightning >= this.Minimums.Lightning &&
                                        combo.Dark >= this.Minimums.Dark &&
                                        combo.Bleed >= this.Minimums.Bleed &&
                                        combo.Poison >= this.Minimums.Poison &&
                                        combo.Frost >= this.Minimums.Frost &&
                                        combo.Curse >= this.Minimums.Curse &&
                                        combo.Poise >= this.Minimums.Poise) {
                                        List.TryToAdd(combo);
                                    }
                                }
                            }
                        }
                        Progress += ProgressIncrement;
                        this._ViewModel.UpdateProgress(Progress);
                    }
                    this._ViewModel.UpdateProgress(100);
                    return List.ToArray();
                };
                return OptimizationEngine;
            }());
            exports_1("OptimizationEngine", OptimizationEngine);
        }
    }
});
//# sourceMappingURL=optimizer.js.map