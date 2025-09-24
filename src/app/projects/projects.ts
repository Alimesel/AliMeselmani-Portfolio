import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  tech: string[];
  imageUrl: string;
  link: string;
  githubLink: string;
  commits?: string;
  stars?: string;
  status: 'development' | 'production' | 'maintenance' | 'Comming Soon';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit {
  projects: Project[] = [
    {
      id: 'abbali-ecommerce',
      name: 'Abbali',
      description: 'Full-featured e-commerce platform with advanced shopping cart, secure payment integration, wishlist functionality, and comprehensive user authentication system.',
      category: 'E-Commerce',
      tech: ['Angular', '.NET Core', 'SQL Server'],
      imageUrl: 'assets/abbali.jpg',
      link: 'https://abbali.vercel.app/',
      githubLink: 'https://github.com/Alimesel',
      commits: '124+',
      stars: '8',
      status: 'production'
    },
     {
      id: 'Coffee-Shop',
      name: 'Coffee Shop',
      description: 'Coffee Shop Management App – A mobile app for managing customers, products, orders, and reports with an integrated POS system, streamlining daily coffee shop operations.',
      category: 'Mobile App',
      tech: ['Angular', 'Capacitor', 'SqlLite'],
      imageUrl: 'assets/Coffee.png',
      link: '',
      githubLink: 'https://github.com/Alimesel',
      commits: '342+',
      stars: '45',
      status: 'production'
    },
    {
      id: 'portfolio-cms',
      name: 'Comming Soon',
      description: 'Dynamic content management system for portfolio websites with real-time editing, responsive templates, and modern web technology integration.',
      category: 'Web App',
      tech: ['Angular', '.NET Core', 'Bootstrap'],
      imageUrl: 'assets/images/portfolio-cms.jpg',
      link: '#',
      githubLink: 'https://github.com/Alimesel',
      commits: '87+',
      stars: '12',
      status: 'development'
    },
    {
      id: 'task-tracker',
      name: 'Comming Soon',
      description: 'Comprehensive task management application with team collaboration features, real-time updates, advanced authentication, and REST API integration.',
      category: 'Productivity',
      tech: ['Angular', 'Node.js', 'MongoDB'],
      imageUrl: 'assets/images/task-tracker.jpg',
      link: '#',
      githubLink: 'https://github.com/Alimesel',
      commits: '156+',
      stars: '15',
      status: 'production'
    },
    
   

  ];

  ngOnInit(): void {
    // Initialize component
    this.startCursorAnimation();
  }

  trackByProject(index: number, project: Project): string {
    return project.id;
  }

  techClass(tech: string): string {
    const mapping: { [key: string]: string } = {
      'Angular': 'angular',
      '.NET Core': 'dotnet',
      'SQL Server': 'sqlserver',
      'Bootstrap': 'bootstrap',
      'Node.js': 'nodejs',
      'MongoDB': 'mongodb',
      'React': 'react',
      'React Native': 'react-native',
      'Docker': 'docker',
      'Redis': 'redis',
      'PostgreSQL': 'postgresql',
      'Python': 'python',
      'FastAPI': 'fastapi',
      'D3.js': 'd3js',
      'SqlLite': 'sqlite' 
      
    };
    return mapping[tech] || 'default';
  }

  getProjectIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'E-Commerce': 'fas fa-shopping-cart',
      'Web App': 'fas fa-globe',
      'Productivity': 'fas fa-tasks',
      'Backend': 'fas fa-server',
      'Mobile App': 'fas fa-mobile-alt',
      'Data Visualization': 'fas fa-chart-line'
    };
    return icons[category] || 'fas fa-code';
  }

  getCategoryIcon(category: string): string {
    return this.getProjectIcon(category);
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'E-Commerce': '#e53e3e',
      'Web App': '#3182ce',
      'Productivity': '#38a169',
      'Backend': '#805ad5',
      'Mobile App': '#d69e2e',
      'Data Visualization': '#dd6b20'
    };
    return colors[category] || '#4a5568';
  }

  getCategorySymbol(category: string): string {
    const symbols: { [key: string]: string } = {
      'E-Commerce': '🛍️',
      'Web App': '🌐',
      'Productivity': '✅',
      'Backend': '⚙️',
      'Mobile App': '📱',
      'Data Visualization': '📊'
    };
    return symbols[category] || '💻';
  }

  showProjectDetails(project: Project): void {
    // Implement modal or navigation to detailed view
    console.log('Show details for:', project.name);
  }

  private startCursorAnimation(): void {
    // Cursor blinking animation will be handled by CSS
  }
}
