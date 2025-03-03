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
    const nameText = this.el.nativeElement.querySelector(".name");
    const profileContainer = this.el.nativeElement.querySelector(".profile-container");

    if (!nameText || !profileContainer) return;

    const hoverElements = [nameText, profileContainer];

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isHovering) return;
    
      // Get cursor position relative to name
      const nameRect = nameText.getBoundingClientRect();
      const nameX = ((e.clientX - nameRect.left) / nameRect.width) * 100;
      const nameY = ((e.clientY - nameRect.top) / nameRect.height) * 100;
      
      // Apply gradient
      const gradientName = `radial-gradient(circle at ${nameX}% ${nameY}%, red, orange, yellow, green, cyan, blue, violet)`;
      nameText.style.backgroundImage = gradientName;
    };

    const applyGradient = () => {
      this.isHovering = true;
    
      nameText.style.transition = 'background-image 0.3s ease-in-out, color 0.3s ease-in-out';
      nameText.style.color = 'transparent';
      nameText.style.backgroundClip = 'text';
      nameText.style.webkitBackgroundClip = 'text';
    
      document.addEventListener("mousemove", handleMouseMove);
    };
    
    const removeGradient = () => {
      this.isHovering = false;
    
      nameText.style.transition = 'background-image 0.3s ease-out, color 0.3s ease-in-out';
      nameText.style.color = '#474849';

      document.removeEventListener("mousemove", handleMouseMove);
    };

    // Attach hover events to both name and profile container
    hoverElements.forEach((element) => {
      this.renderer.listen(element, 'mouseenter', applyGradient);
      this.renderer.listen(element, 'mouseleave', removeGradient);
    });
  }
}
