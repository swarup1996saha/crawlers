import { Component, inject, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss'],
  animations: [
    trigger('loaderState', [
      state('in', style({
        opacity: 1,
        transform: 'perspective(1000px) rotateY(0deg) translateZ(0)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'perspective(1000px) rotateY(90deg) translateZ(100px)'
      })),
      transition('in => out', [
        animate('0.7s cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('out => in', [
        animate('0.5s cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('glowEffect', [
      state('normal', style({
        filter: 'drop-shadow(0 0 10px rgba(255,0,0,0.5))'
      })),
      state('glow', style({
        filter: 'drop-shadow(0 0 30px rgba(255,0,0,0.8)) drop-shadow(0 0 60px rgba(255,0,0,0.4))'
      })),
      transition('normal <=> glow', [
        animate('1.5s cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class LoaderComponent implements OnInit, OnDestroy {
  private loaderService = inject(LoaderService);
  isLoading = this.loaderService.isLoading;
  loaderState = 'in';
  glowState = 'normal';
  private glowInterval: any;

  constructor() {
    console.log('Loader Component Created');
    // Create effect to handle loader state changes
    effect(() => {
      const isLoading = this.isLoading();
      console.log('Loading state changed:', isLoading);
      this.loaderState = isLoading ? 'in' : 'out';
    });
  }

  ngOnInit(): void {
    console.log('Loader Component Initialized');
    this.startGlowAnimation();
  }

  ngOnDestroy(): void {
    if (this.glowInterval) {
      clearInterval(this.glowInterval);
    }
  }

  private startGlowAnimation(): void {
    this.glowInterval = setInterval(() => {
      this.glowState = this.glowState === 'normal' ? 'glow' : 'normal';
    }, 1500);
  }
}