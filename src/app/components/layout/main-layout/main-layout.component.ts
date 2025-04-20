import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="main-layout">
      <div class="sidebar">
        <app-sidebar></app-sidebar>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .main-layout {
      display: flex;
      height: 100vh;
    }
    .sidebar {
      width: 250px;
      background-color: #f8f9fa;
      border-right: 1px solid #dee2e6;
    }
    .content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
  `]
})
export class MainLayoutComponent { }
