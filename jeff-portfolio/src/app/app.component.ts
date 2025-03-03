import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isEntryPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isEntryPage = this.router.url === '/entry';
    });
  }
}
