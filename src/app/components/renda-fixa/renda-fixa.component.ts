import { Component } from '@angular/core';

@Component({
  selector: 'app-renda-fixa',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
  `]
})
export class RendaFixaComponent { }
