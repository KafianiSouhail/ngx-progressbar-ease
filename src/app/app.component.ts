import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ProgressBarModule } from 'progress-bar';

@Component({
  selector: 'app-root',
  imports: [ProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);

  ngOnInit(): void {
    this.http
      .get('https://jsonplaceholder.typicode.com/photos', {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((_) => {});
  }
}
