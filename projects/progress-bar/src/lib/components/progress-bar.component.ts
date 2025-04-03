import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProgressBarService } from '../services/progress-bar.service';

@Component({
  selector: 'lib-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  standalone: false,
})
export class ProgressBarComponent {
  private readonly progressService = inject(ProgressBarService);

  public progress = toSignal(this.progressService.progress$);
}
