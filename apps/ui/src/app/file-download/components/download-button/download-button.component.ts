import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { ServerSelectService } from '../../../server-selection';

@Component({
    selector: 'app-download-button',
    templateUrl: './download-button.component.html',
    styleUrl: './download-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule],
})
export class DownloadButtonComponent {
    private readonly serverSelectService = inject(ServerSelectService);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly hasServerSelected$ = this.serverSelectService
        .getSelectedServer()
        .pipe(map(Boolean), takeUntilDestroyed(this.destroyRef));

    private readonly downloadingSubject = new BehaviorSubject(false);

    protected readonly downloading$ = this.downloadingSubject.pipe(
        map((isDownloading) => (isDownloading ? 'd-inline-block' : 'd-none')),
        takeUntilDestroyed(this.destroyRef)
    );

    protected onDownloadFile() {
        this.downloadingSubject.next(true);

        this.serverSelectService
            .downloadFileFromServer()
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.downloadingSubject.next(false))
            )
            .subscribe();
    }
}
