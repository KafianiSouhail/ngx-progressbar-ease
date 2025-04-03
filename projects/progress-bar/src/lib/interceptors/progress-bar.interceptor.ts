import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap, timer } from 'rxjs';
import { ProgressBarService } from '../services/progress-bar.service';

const RERSET_PROGRESS_TIMER = 1700;

export function progressBarInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const progressBarService = inject(ProgressBarService);
  const clonedRequest = req.clone({ reportProgress: true });

  return next(clonedRequest).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Sent) {
        progressBarService.setProgress(1);
      } else if (
        event.type === HttpEventType.UploadProgress ||
        event.type === HttpEventType.DownloadProgress
      ) {
        const progress = event.total
          ? Math.round((100 * event.loaded) / event.total)
          : 0;
        progressBarService.setProgress(progress);
      } else if (event.type === HttpEventType.Response) {
        progressBarService.setProgress(100);
        timer(RERSET_PROGRESS_TIMER).subscribe((_) =>
          progressBarService.setProgress(0)
        );
      }
    })
  );
}
