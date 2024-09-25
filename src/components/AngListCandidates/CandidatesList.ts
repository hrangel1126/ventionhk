import {Component, Input, OnInit} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {CandidateCard} from "./CandidateCard";
import type {StorageData} from "./model";
import { StorageService, Candidate, RequestData } from '../../services/storage.service';

export class StorageError extends Error {}

interface Engineer {
    candidateName: string;
    description: string;
    topSkills: string;
    hourRate: string;
    percentage: string;
}

@Component({
    standalone: true,
    selector: 'app-engineers-list',
    templateUrl: './CandidatesList.html',
    styleUrls: ['./styles.scss'],
    imports: [NgIf, CommonModule, NgFor, CandidateCard]
})
export class CandidatesList implements OnInit {
    @Input() filterIndex = -1

    private allMeta$ = new BehaviorSubject([])
    currentMeta$: Observable<any>
    private engineersSubject = new BehaviorSubject<Engineer[][]>([]);
    engineers$: Observable<Engineer[]>;
    currentIndex = 0;
    loading = false;
    error: string | null = null;

    constructor(private storageService: StorageService) {
        this.engineers$ = this.engineersSubject.pipe(
            map(engineers => engineers[this.currentIndex] || [])
        );
    }

    ngOnInit(): void {
        this.fetchEngineers();
    }

    fetchEngineers(): void {
        this.loading = true;
        this.error = null;
        this.storageService.getData().subscribe(
            (data) => {
                if (data && data.ReqData.length > 0) {
                    const candidates = data.ReqData.map(request => request.candidates);
                    this.engineersSubject.next(candidates);
                    this.allMeta$.next(data.ReqData);
                    this.currentIndex = this.filterIndex === -1 ? candidates.length - 1 : this.filterIndex;
                    this.currentMeta$ = this.allMeta$.pipe(
                        map(metaDataList => metaDataList[this.currentIndex] || {})
                    );
                } else {
                    this.error = 'No engineers data found';
                }
                this.loading = false;
            },
            (error) => {
                this.error = 'An error occurred while fetching data';
                this.loading = false;
            }
        );
    }

    next(): void {
        this.currentIndex = (this.currentIndex + 1) % this.engineersSubject.value.length;
        this.engineers$ = this.engineersSubject.pipe(
            map(engineers => engineers[this.currentIndex] || [])
        );
        this.currentMeta$ = this.allMeta$.pipe(
            map(metaDataList => metaDataList[this.currentIndex] || {})
        )
    }

    prev(): void {
        this.currentIndex = (this.currentIndex - 1 + this.engineersSubject.value.length) % this.engineersSubject.value.length;
        this.engineers$ = this.engineersSubject.pipe(
            map(engineers => engineers[this.currentIndex] || [])
        );
        this.currentMeta$ = this.allMeta$.pipe(
            map(metaDataList => metaDataList[this.currentIndex] || {})
        )
    }
}