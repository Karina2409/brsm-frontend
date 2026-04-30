import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardAdmin } from './event-card-admin';

describe('EventCardAdmin', () => {
    let component: EventCardAdmin;
    let fixture: ComponentFixture<EventCardAdmin>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EventCardAdmin],
        }).compileComponents();

        fixture = TestBed.createComponent(EventCardAdmin);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
