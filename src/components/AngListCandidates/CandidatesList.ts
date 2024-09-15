
// engineers-list.component.ts
import {Component, Input, OnInit} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {CandidateCard} from "./CandidateCard";
import type {StorageData} from "./model";

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

    constructor() {
        this.engineers$ = this.engineersSubject.pipe(
            map(engineers => engineers[this.currentIndex] || [])
        );
    }

    ngOnInit(): void {
        this.fetchEngineers();
        this.engineers$.subscribe(console.warn)
    }

    fetchEngineers(): void {
        this.loading = true;
        this.error = null;
        try {
            const list = this.loadEngineers();
            this.engineersSubject.next(list);
            if (this.filterIndex === -1) {
                this.currentIndex = list.length - 1;
            } else {
                this.currentIndex = this.filterIndex
            }
            console.log({ filterIndex: this.filterIndex, current: this.currentIndex })
            const allMeta = this.allMeta$.getValue()
            this.currentMeta$ = this.allMeta$.pipe(
                map(metaDataList => metaDataList[this.currentIndex] || {})
            )
            this.loading = false;
        } catch (error) {
            this.error = error instanceof Error ? error.message : 'An unknown error occurred';
            this.loading = false;
        }
    }

    loadEngineers(): Engineer[][] {
        // Implement this method to load engineers data
        const storageData = localStorage.getItem('ReqData');
        if (storageData) {
            const parsedData: StorageData[] = JSON.parse(storageData);
            console.log(parsedData);
            if (parsedData?.ReqData?.length > 0) {
                const candidates = parsedData.ReqData.map(request => request.candidates)

                this.allMeta$.next(parsedData.ReqData);

                return candidates as unknown as Engineer[][];
            }
            console.log({ parsedData })
            throw new StorageError('No engineers data found')
        } else {
            throw new StorageError('ReqData was not found in local')
        }
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