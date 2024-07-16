import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    EventEmitter,
    ExistingProvider,
    forwardRef,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ServerConfig } from '@woodwing/studio-desktop-app/data';
import { DownloadButtonComponent } from '../../../file-download';
import { ServerSelectService } from '../../services';

const serverSelectValueAccessorProvider: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ServerSelectComponent),
    multi: true,
};

@Component({
    selector: 'app-server-selection',
    templateUrl: './server-select.component.html',
    styleUrl: './server-select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, DownloadButtonComponent],
    providers: [serverSelectValueAccessorProvider],
})
export class ServerSelectComponent implements OnInit, ControlValueAccessor {
    @Input() public value: ServerConfig;

    @Input() public disabled = false;

    @Output() public readonly valueChange = new EventEmitter<ServerConfig>();

    protected onChanged: (serverConfig: ServerConfig) => void;

    protected onTouched: () => void;

    protected options: (ServerConfig & { label: string })[] = [
        { label: 'Production', url: 'http://localhost:8080', name: 'production' },
        { label: 'Studio Dev', url: 'http://localhost:8090', name: 'studio-dev' },
        { label: 'Studio Test', url: 'http://localhost:8100', name: 'studio-test' },
    ];

    private readonly serverSelectService = inject(ServerSelectService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    public ngOnInit() {
        this.serverSelectService
            .getSelectedServer()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (serverName) => {
                    if (!serverName) return;
                    this.value = this.options.find((option) => option.name === serverName);
                    this.changeDetectorRef.markForCheck();
                },
            });
    }

    public writeValue(serverConfig: ServerConfig) {
        this.value = serverConfig;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    public registerOnChange(fn: (serverConfig: ServerConfig) => void) {
        this.onChanged = fn;
    }

    public registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    protected onChange(serverName: string) {
        this.value = this.options.find((server) => server.name === serverName);
        this.onChanged(this.value);
        this.valueChange.emit(this.value);

        this.updateSelectServer(this.value);
    }

    private updateSelectServer(serverConfig: ServerConfig) {
        this.serverSelectService
            .updateSelectedServer(serverConfig)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }
}
