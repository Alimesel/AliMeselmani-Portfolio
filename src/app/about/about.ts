import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChild('aboutCode') codeBlock!: ElementRef<HTMLPreElement>;

  private scrollAmount = 0;
  private scrollStep = 0.3;
  private isPaused = false;
  private animationFrameId?: number;
  private observer!: IntersectionObserver;

  // Code symbols for floating animation
  codeSymbols: string[] = [
    '{ }',
    '< />',
    '[ ]',
    '( )',
    '=>'
  ];

  // Statistics data
  stats = [
    { label: 'Years Coding', value: 4, suffix: '+', display: '0+' },
    { label: 'Practice Projects', value: 25, suffix: '+', display: '0+' },
    { label: 'Learning Hours', value: 1000, suffix: '+', display: '0+' },
    { label: 'Technologies Explored', value: 10, suffix: '+', display: '0+' }
  ];

  ngAfterViewInit(): void {
    this.initAutoScroll();
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Pause the auto-scroll animation
   */
  pauseScroll(): void {
    this.isPaused = true;
  }

  /**
   * Resume the auto-scroll animation
   */
  resumeScroll(): void {
    this.isPaused = false;
  }

  /**
   * Handle image loading error
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Create a fallback avatar with initials
    img.style.display = 'none';
    const container = img.parentElement;
    if (container) {
      container.innerHTML = `
        <div style="
          width: 100%; 
          height: 100%; 
          background: linear-gradient(135deg, #64ffda, #a855f7); 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 2rem; 
          font-weight: bold; 
          color: white;
          box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
        ">
          AM
        </div>
      `;
    }
  }

  /**
   * Initialize auto-scroll for the code block
   */
  private initAutoScroll(): void {
    if (!this.codeBlock) return;

    const el = this.codeBlock.nativeElement;
    
    const autoScroll = (): void => {
      if (!this.isPaused && el) {
        this.scrollAmount += this.scrollStep;
        
        // Reset scroll when reaching the bottom
        if (this.scrollAmount >= el.scrollHeight - el.clientHeight) {
          this.scrollAmount = 0;
        }
        
        el.scrollTop = this.scrollAmount;
      }
      
      this.animationFrameId = requestAnimationFrame(autoScroll);
    };
    
    autoScroll();
  }

  /**
   * Set up IntersectionObserver for stats animation
   */
  private setupScrollAnimation(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'));
          const stat = this.stats[index];
          
          if (entry.isIntersecting && stat) {
            // Animate number when it comes into view
            this.animateStat(stat);
          } else if (stat) {
            // Reset when it goes out of view
            stat.display = '0+';
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe each stat element after a short delay to ensure DOM is ready
    setTimeout(() => {
      const elements = document.querySelectorAll('.stat');
      elements.forEach((el, idx) => {
        el.setAttribute('data-index', idx.toString());
        this.observer.observe(el);
      });
    }, 100);
  }

  /**
   * Animate a single statistic counter
   */
  private animateStat(stat: { label: string; value: number; suffix: string; display: string }): void {
    let start = 0;
    const end = stat.value;
    const duration = 1000; // Total duration in milliseconds
    const stepTime = 20; // Update every 20ms
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const counter = setInterval(() => {
      start += increment;
      
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      
      stat.display = Math.floor(start) + stat.suffix;
    }, stepTime);
  }
}