import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { EmployeesComponent } from './components/employees/employees.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent,  EmployeesComponent],
  template: `
    <app-header></app-header>
    <main class="container mt-4">
      <app-employees></app-employees>
    </main>

  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

