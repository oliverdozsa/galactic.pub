import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  status: 'live' | 'beta' | 'wip';
  url: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  readonly projects: Project[] = [
    {
      id: 'stellar-vote',
      name: 'Stellar Vote',
      tagline: 'Anonymous on-chain voting',
      description:
        'A trustless, anonymous voting system on the Stellar network. Smart contracts handle ballot logic — no central authority decides the outcome, and no voter reveals their identity.',
      tags: ['Stellar', 'Smart Contracts', 'Web3', 'Privacy'],
      status: 'wip',
      url: '#',
    },
  ];

  readonly statusLabel: Record<Project['status'], string> = {
    live: 'Live',
    beta: 'Beta',
    wip: 'In progress',
  };

  readonly statusColor: Record<Project['status'], string> = {
    live: '#16a34a',
    beta: '#7c3aed',
    wip: '#d97706',
  };

  readonly statusBg: Record<Project['status'], string> = {
    live: '#f0fdf4',
    beta: '#f5f3ff',
    wip: '#fffbeb',
  };

  readonly statusDot: Record<Project['status'], string> = {
    live: '#22c55e',
    beta: '#8b5cf6',
    wip: '#f59e0b',
  };
}
