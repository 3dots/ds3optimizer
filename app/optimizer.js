System.register(['./armory', './doublylinkedlist'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var armory_1, doublylinkedlist_1;
    var OptimizationWorker, WorkerStartMessage, WorkerResultMessage;
    return {
        setters:[
            function (armory_1_1) {
                armory_1 = armory_1_1;
            },
            function (doublylinkedlist_1_1) {
                doublylinkedlist_1 = doublylinkedlist_1_1;
            }],
        execute: function() {
            OptimizationWorker = (function () {
                function OptimizationWorker() {
                }
                OptimizationWorker.prototype.onmessage = function (data) {
                    this.MaxWeight = data.AvailableWeight;
                    this.MaxListLength = data.ResultListLength;
                    this.Armory = data.Armory;
                    this.Minimums = data.Minimums;
                    this.ACF = new armory_1.ArmorCombinationFactory(data.Weights);
                    this.ComputeOptimals();
                };
                OptimizationWorker.prototype.ComputeOptimals = function () {
                    var AM = new armory_1.ArmorMethods(this.Armory);
                    var status = { MessageType: "Working", Progress: 0, Results: null };
                    postMessage(status);
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
                        status = { MessageType: "Working", Progress: Progress, Results: null };
                        postMessage(status);
                    }
                    status = { MessageType: "Done", Progress: 100, Results: List.ToArray() };
                    postMessage(status);
                };
                return OptimizationWorker;
            }());
            exports_1("OptimizationWorker", OptimizationWorker);
            WorkerStartMessage = (function () {
                function WorkerStartMessage() {
                }
                return WorkerStartMessage;
            }());
            exports_1("WorkerStartMessage", WorkerStartMessage);
            WorkerResultMessage = (function () {
                function WorkerResultMessage() {
                }
                return WorkerResultMessage;
            }());
            exports_1("WorkerResultMessage", WorkerResultMessage);
        }
    }
});
//# sourceMappingURL=optimizer.js.map