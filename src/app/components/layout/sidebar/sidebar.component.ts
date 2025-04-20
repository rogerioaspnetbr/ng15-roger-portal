import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar-menu">
      <ul>
        <li>
          <a routerLink="/renda-fixa" routerLinkActive="active">
            Renda Fixa
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .sidebar-menu {
      padding: 20px;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      margin-bottom: 10px;
    }
    a {
      display: block;
      padding: 10px;
      color: #333;
      text-decoration: none;
      border-radius: 4px;
    }
    a:hover {
      background-color: #e9ecef;
    }
    a.active {
      background-color: #007bff;
      color: white;
    }
  `]
})
export class SidebarComponent { }
