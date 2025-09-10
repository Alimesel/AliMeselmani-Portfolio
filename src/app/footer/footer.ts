import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {

  currentYear: number = new Date().getFullYear();

  // Contact Information
  private readonly phoneNumber = '+96103095740';
  private readonly email = 'alimeselmani2003@gmail.com';
  private readonly linkedInUrl = 'http://linkedin.com/in/ali-meselmani';
  private readonly githubUrl = 'https://github.com/Alimesel';

  constructor() { }

  ngOnInit(): void {}

  // Social Media Methods
  openLinkedIn(): void {
    window.open(this.linkedInUrl, '_blank', 'noopener,noreferrer');
  }

  openGitHub(): void {
    window.open(this.githubUrl, '_blank', 'noopener,noreferrer');
  }

  sendEmail(): void {
    // Open Gmail compose in a new tab with your email pre-filled
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  }

  // Phone Method
  callPhone(): void {
    window.open(`tel:${this.phoneNumber}`, '_self');
  }

  // Quick Action Methods
  hireMe(): void {
    // Open Gmail compose with subject and body pre-filled
    const subject = encodeURIComponent('Hiring Inquiry - Portfolio Website');
    const body = encodeURIComponent(
      'Hello Ali,\n\nI am interested in hiring you for a project. Please let me know your availability and rates.\n\nProject Details:\n- \n- \n- \n\nBest regards,'
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  }

  getQuote(): void {
    const subject = encodeURIComponent('Quote Request - Portfolio Website');
    const body = encodeURIComponent(
      'Hello Ali,\n\nI would like to request a quote for my project.\n\nProject Requirements:\n- \n- \n- \n\nTimeline: \nBudget Range: \n\nBest regards,'
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  }

  viewWork(): void {
    this.scrollToSection('projects');
  }

  downloadCV(): void {
    const cvUrl = 'assets/CV.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Navigation Method
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    } else {
      const elementByClass = document.querySelector(`.${sectionId}`);
      if (elementByClass) {
        elementByClass.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      } else {
        console.warn(`Section with id '${sectionId}' not found`);
      }
    }
  }

  // Utility Methods
  private openInNewTab(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private createMailtoLink(subject: string, body: string): string {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:${this.email}?subject=${encodedSubject}&body=${encodedBody}`;
  }

}
