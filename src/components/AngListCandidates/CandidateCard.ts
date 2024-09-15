// engineer-card.component.ts
import { Component, Input } from '@angular/core';
import {CommonModule, NgFor, NgForOf, NgIf} from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-engineer-card',
    templateUrl: './CandidateCard.html',
    styleUrls: [],
    imports: [NgIf, CommonModule, NgForOf]
})
export class CandidateCard {
    @Input() engineer!: {
        candidateName: string;
        percentage: string;
        description: string;
        topSkills: string;
        hourRate: string;
    };
}