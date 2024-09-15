// engineer-card.component.ts
import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-engineer-card',
    templateUrl: './CandidateCard.html',
    styleUrls: []
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