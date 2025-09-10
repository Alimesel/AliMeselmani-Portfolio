import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [HttpClientModule]  // ✅ Add this!
})
export class Home implements OnInit {
  strengths: string[] = [
    'Web Developer',
    'Full Stack Engineer',
    'Project Management',
    'Problem Solving',
    'Team Collaboration'
  ];

  currentIndex = 0;
  strengthElement!: HTMLElement;
  isDeleting = false;
  text = '';
  typingSpeed = 100;

  linkedInUrl: string = 'http://linkedin.com/in/ali-meselmani';
  githubUrl: string = 'https://github.com/Alimesel';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.strengthElement = document.getElementById('strength-text')!;
      this.typeStrength();
    }, 0);
  }

  typeStrength() {
    const fullText = this.strengths[this.currentIndex];

    if (this.isDeleting) {
      this.text = fullText.substring(0, this.text.length - 1);
    } else {
      this.text = fullText.substring(0, this.text.length + 1);
    }

    if (this.strengthElement) this.strengthElement.innerHTML = this.text;

    let speed = this.isDeleting ? 50 : this.typingSpeed;

    if (!this.isDeleting && this.text === fullText) {
      speed = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.strengths.length;
    }

    setTimeout(() => this.typeStrength(), speed);
  }

  downloadCV() {
    this.http.get('assets/CV.pdf', { responseType: 'blob' }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }
}
