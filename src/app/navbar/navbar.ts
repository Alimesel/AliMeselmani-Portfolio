import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements AfterViewInit, OnDestroy {
  currentSection: string = 'home';
  private observer!: IntersectionObserver;

  // For mobile toggle
  isOpen: boolean = false;

  ngAfterViewInit(): void {
    const sections = document.querySelectorAll('.content > div[id]');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.currentSection = entry.target.id;
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30% 0px', // ✅ ensures last sections (like projects) still activate
        threshold: 0.1 // ✅ more sensitive, works better on small screens
      }
    );

    sections.forEach(section => this.observer.observe(section));
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.currentSection = sectionId; // ✅ mark active immediately
    }
    this.isOpen = false; // auto close on mobile
  }

  isActive(sectionId: string): boolean {
    return this.currentSection === sectionId;
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
}
