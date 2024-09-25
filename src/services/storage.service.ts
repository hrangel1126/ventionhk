import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Candidate {
  candidateName: string;
  description: string;
  topSkills: string;
  hourRate: string;
  percentage: string;
}

export interface RequestData {
  id: number;
  inquery: string;
  candidates: Candidate[];
  timestamp: string;
}

export interface StorageData {
  ReqData: RequestData[];
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageKey = 'ReqData';
  private dataSubject = new BehaviorSubject<StorageData | null>(null);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.dataSubject.next(JSON.parse(data));
    }
  }

  getData(): Observable<StorageData | null> {
    return this.dataSubject.asObservable();
  }

  saveData(data: RequestData): void {
    const currentData = this.dataSubject.value || { ReqData: [] };
    currentData.ReqData.push(data);
    localStorage.setItem(this.storageKey, JSON.stringify(currentData));
    this.dataSubject.next(currentData);
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
    this.dataSubject.next(null);
  }
}