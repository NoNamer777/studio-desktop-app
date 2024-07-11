import { Component } from '@angular/core';
import { HeaderComponent } from '../header';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrl: './root.component.scss',
    standalone: true,
    imports: [HeaderComponent],
})
export class RootComponent {}
