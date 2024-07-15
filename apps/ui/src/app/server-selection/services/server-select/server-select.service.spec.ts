import { TestBed } from '@angular/core/testing';

import { ServerSelectService } from './server-select.service';

describe('ServerSelectService', () => {
    let service: ServerSelectService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ServerSelectService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
