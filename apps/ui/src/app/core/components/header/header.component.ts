import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [CommonModule],
})
export class HeaderComponent {
    appVersion = window.studioDesktopApp.getAppVersion();
}
