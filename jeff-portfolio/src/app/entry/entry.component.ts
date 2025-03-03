import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  constructor(private router: Router) {}

  openPortfolio() {
    this.router.navigate(['/home']);
  }
}
