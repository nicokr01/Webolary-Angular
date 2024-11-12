import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor(public router: Router) {}

  // Navigate to a different route
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  // Function to send an email (replaces sendEmail function)
  sendEmail() {
    const email = 'newcomer@webolary.com';
    const subject = 'Webolary Team Join';
    const body = 'Explain why you want to join and about your skills';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  // Handle scrolling for dynamic styles
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const header = document.getElementById('header');
    const navAction = document.getElementById('navAction');
    const toToggle = document.querySelectorAll('.toggleColour');

    if (window.scrollY > 10) {
      header?.classList.add('bg-gray-200');
      navAction?.classList.replace('bg-white', 'bgRegister');
      navAction?.classList.replace('text-gray-800', 'text-white');
      toToggle.forEach((element) => {
        element.classList.replace('text-white', 'text-gray-800');
      });
    } else {
      header?.classList.remove('bg-gray-200');
      navAction?.classList.replace('bgRegister', 'bg-white');
      navAction?.classList.replace('text-white', 'text-gray-800');
      toToggle.forEach((element) => {
        element.classList.replace('text-gray-800', 'text-white');
      });
    }
  }
}
