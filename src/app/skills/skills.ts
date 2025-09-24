import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule, NgClass, NgFor } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
  filter?: string;
}

interface SkillCategory {
  name: string;
  list: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private animationTimeouts: number[] = [];

  skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      list: [
        { 
          name: 'HTML5', 
          level: 95, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
          color: '#E34F26'
        },
        { 
          name: 'CSS3', 
          level: 90, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
          color: '#1572B6'
        },
        { 
          name: 'JavaScript', 
          level: 50, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
          color: '#F7DF1E'
        },
        { 
          name: 'TypeScript', 
          level: 90, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
          color: '#3178C6'
        },
        { 
          name: 'Angular', 
          level: 90, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
          color: '#DD0031'
        },
        { 
          name: 'Bootstrap', 
          level: 85, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
          color: '#7952B3'
        },
        { 
          name: 'Tailwind CSS', 
          level: 30, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
          color: '#06B6D4'
        }
      ]
    },
    {
      name: 'Backend',
      list: [
        { 
          name: 'C#', 
          level: 85, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
          color: '#239120'
        },
        { 
          name: '.NET Core', 
          level: 85, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
          color: '#512BD4'
        },
        { 
          name: 'Java', 
          level: 85, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
          color: '#007396'
        },
        { 
          name: 'PHP', 
          level: 85, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
          color: '#777BB4'
        },
        { 
          name: 'MySQL', 
          level: 80, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
          color: '#4479A1'
        },
        { 
          name: 'SQL Server', 
          level: 85, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
          color: '#CC2927'
        },
        { 
          name: 'PostgreSQL', 
          level: 50, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
          color: '#336791'
        }
      ]
    },
    {
      name: 'Tools & DevOps',
      list: [
        { 
          name: 'Git', 
          level: 50, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
          color: '#F05032'
        },
        { 
          name: 'GitHub', 
          level: 50, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
          color: '#181717',
          filter: 'invert(1)'
        },
        { 
          name: 'VS Code', 
          level: 90, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
          color: '#007ACC'
        },
        { 
          name: 'Visual Studio', 
          level: 80, 
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-plain.svg',
          color: '#5C2D91'
        },
        
        { 
          name: 'Postman', 
          level: 85, 
          icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
          color: '#FF6C37'
        }
      ]
    },
    {
      name: 'Automation & AI',
      list: [
        { 
          name: 'ChatGPT', 
          level: 90, 
          icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
          color: '#10A37F'
        },
        { 
          name: 'Claude AI', 
          level: 90, 
          icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRDk3NzA2IiByeD0iOCIvPgo8cGF0aCBkPSJNMTIgMTZjMC00LjQgMy42LTggOC04czggMy42IDggOHY4YzAgNC40LTMuNiA4LTggOHMtOC0zLjYtOC04VjE2eiIgZmlsbD0iIzI5MkEzOSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI0IiBmaWxsPSIjRDk3NzA2Ii8+Cjwvc3ZnPg==',
          color: '#D97706'
        },
        { 
          name: 'GitHub Copilot', 
          level: 88, 
          icon: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
          color: '#24292e'
        },
        { 
          name: 'Google Gemini', 
          level: 75, 
          icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
          color: '#4285F4'
        },
        { 
          name: 'DeepSeek', 
          level: 70, 
          icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjN0MzQUVEIiByeD0iOCIvPgo8cGF0aCBkPSJNMTIgMTJoMTZ2NEgxMnoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMiAxOGgxMnY0SDEyeiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEyIDI0aDE2djRIMTJ6IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGZpbGw9IiNGQUNDMTUiIGN4PSIzMiIgY3k9IjE0IiByPSIyIi8+Cjwvc3ZnPg==',
          color: '#7C3AED'
        },
        { 
          name: 'Hugging Face', 
          level: 50, 
          icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
          color: '#FF9900'
        },
       
      ]
    }
  ];

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
    this.animateCategories();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  /**
   * Track function for ngFor optimization
   */
  trackBySkill(index: number, skill: Skill): string {
    return skill.name;
  }

  /**
   * Generate progress bar gradient based on skill color
   */
  getProgressGradient(color: string): string {
    return `linear-gradient(90deg, ${color}80, ${color})`;
  }

  /**
   * Handle icon loading errors
   */
  onIconError(event: Event, skill: Skill): void {
    const img = event.target as HTMLImageElement;
    // Create a fallback colored circle with first letter
    const fallbackSvg = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="${skill.color}"/>
        <text x="16" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
          ${skill.name.charAt(0)}
        </text>
      </svg>
    `)}`;
    img.src = fallbackSvg;
  }

  /**
   * Setup intersection observer for progress bar animations
   */
  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateProgressBars(entry.target as HTMLElement);
          } else {
            this.resetProgressBars(entry.target as HTMLElement);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all skill categories
    const categories = this.elementRef.nativeElement.querySelectorAll('.category');
    categories.forEach((category: Element) => {
      this.observer.observe(category);
    });
  }

  /**
   * Animate progress bars when category comes into view
   */
  private animateProgressBars(categoryElement: HTMLElement): void {
    const progressBars = categoryElement.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
      const progressBar = bar as HTMLElement;
      const target = parseInt(progressBar.getAttribute('data-target') || '0');
      
      const timeout = setTimeout(() => {
        progressBar.style.width = `${target}%`;
      }, index * 100 + 200); // Stagger animations
      
      this.animationTimeouts.push(timeout);
    });
  }

  /**
   * Reset progress bars when category leaves view
   */
  private resetProgressBars(categoryElement: HTMLElement): void {
    const progressBars = categoryElement.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
      (bar as HTMLElement).style.width = '0%';
    });
  }

  /**
   * Animate category appearance with staggered delays
   */
 private animateCategories(): void {
  const categories: NodeListOf<Element> =
    this.elementRef.nativeElement.querySelectorAll('.category');
  
  categories.forEach((category: Element, index: number) => {
    const timeout = setTimeout(() => {
      const cat = category as HTMLElement;
      cat.style.animationDelay = `${index * 0.2}s`;
      cat.style.opacity = '1';
      cat.style.transform = 'translateX(0)';
    }, index * 150);

    this.animationTimeouts.push(timeout);
  });
}

}