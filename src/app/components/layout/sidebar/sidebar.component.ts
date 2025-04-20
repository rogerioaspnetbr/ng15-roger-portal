import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

interface MenuItem {
  title: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      title: 'Usuários',
      icon: 'people',
      children: [
        {
          title: 'Listar',
          icon: 'list',
          route: '/users'
        },
        {
          title: 'Criar',
          icon: 'add',
          route: '/users/create'
        }
      ]
    },
    {
      title: 'Configurações',
      icon: 'settings',
      route: '/settings'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
