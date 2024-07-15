import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerSelectComponent } from './server-select.component';

describe('ServerSelectionComponent', () => {
    let component: ServerSelectComponent;
    let fixture: ComponentFixture<ServerSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServerSelectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ServerSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
