import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RootComponent } from './root.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RootComponent, NxWelcomeComponent, RouterTestingModule],
        }).compileComponents();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(RootComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Welcome ui');
    });

    it(`should have as title 'ui'`, () => {
        const fixture = TestBed.createComponent(RootComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('ui');
    });
});
