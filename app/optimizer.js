/// <reference path="../node_modules/typescript/lib/lib.webworker.d.ts"/>
"use strict";
var armory_1 = require('./armory');
var doublylinkedlist_1 = require('./doublylinkedlist');
var OptimizationWorker = (function () {
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
exports.OptimizationWorker = OptimizationWorker;
var WorkerStartMessage = (function () {
    function WorkerStartMessage() {
    }
    return WorkerStartMessage;
}());
exports.WorkerStartMessage = WorkerStartMessage;
var WorkerResultMessage = (function () {
    function WorkerResultMessage() {
    }
    return WorkerResultMessage;
}());
exports.WorkerResultMessage = WorkerResultMessage;
//# sourceMappingURL=optimizer.js.map