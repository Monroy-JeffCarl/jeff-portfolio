import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isHovering = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const text = this.el.nativeElement.querySelector(".name");
    if (!text) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isHovering) return;

      const { width, height, left, top } = text.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      text.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, 
          red, orange, yellow, green, cyan, blue, violet)`;
    };

    this.renderer.listen(text, 'mouseenter', () => {
      this.isHovering = true;
      text.style.transition = 'background-image 0.3s ease-out, color 0.3s ease-in-out';
      text.style.color = 'transparent';
      text.style.backgroundClip = 'text';
      text.style.webkitBackgroundClip = 'text';
      text.style.backgroundImage = `radial-gradient(circle at 50% 50%, 
          red, orange, yellow, green, cyan, blue, violet)`;

      document.addEventListener("mousemove", handleMouseMove);
    });

    this.renderer.listen(text, 'mouseleave', () => {
      this.isHovering = false;

      text.style.transition = 'background-image 0.3s ease-out, color 0.3s ease-in-out';
      text.style.color = '#474849';

      document.removeEventListener("mousemove", handleMouseMove);
    });
  }
}
