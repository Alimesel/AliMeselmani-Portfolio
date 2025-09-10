import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, Home,About,Skills,Projects,Footer,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ali Meselmani Portfolio');
}
