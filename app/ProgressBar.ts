import {Component, Input} from "@angular/core";

@Component({
    selector: "progress-bar",
    template: `
<div class="progress">
    <div class="progress-bar"
        role="progressbar"
        [attr.aria-valuenow]="value / max * 100"
        aria-valuemin="0"
        [attr.aria-valuemax]="value / max * 100" [ngStyle]="{ width: value / max * 100 + '%' }">
        {{ value / max * 100 | number:'.0' }}% Complete
    </div>
</div>
`
})
export class ProgressBar {

    @Input()
    value = 0;

    @Input()
    max = 100;

}