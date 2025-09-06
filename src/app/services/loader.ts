import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSignal = signal(true);

  constructor() {
    // Reduced loader time to 3 seconds
    setTimeout(() => {
      this.hideLoader();
    }, 3000);
  }

  get isLoading() {
    return this.isLoadingSignal;
  }

  private hideLoader() {
    this.isLoadingSignal.set(false);
  }
}