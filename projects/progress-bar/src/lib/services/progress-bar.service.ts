import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private readonly progress = signal<number>(0);

  public readonly progress$ = toObservable(this.progress);

  public setProgress(progress: number): void {
    this.progress.set(progress);
  }
}
