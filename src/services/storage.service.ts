import { Injectable } from '@angular/core';
import type { StorageData } from '../components/AngListCandidates/model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageKey = 'ReqData';

  getData(): StorageData | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  saveData(data: StorageData): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
