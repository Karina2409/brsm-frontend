import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventsPage } from './all-events-page';

describe('AllEventsPage', () => {
    let component: AllEventsPage;
    let fixture: ComponentFixture<AllEventsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AllEventsPage],
        }).compileComponents();

        fixture = TestBed.createComponent(AllEventsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
