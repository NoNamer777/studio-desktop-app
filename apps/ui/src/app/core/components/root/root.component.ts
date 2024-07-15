import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServerSelectComponent } from '../../../server-selection';
import { HeaderComponent } from '../header';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrl: './root.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, HeaderComponent, ServerSelectComponent],
})
export class RootComponent {
    public readonly form = new FormGroup({
        selectedServer: new FormControl<string>(null, [Validators.required]),
    });
}
