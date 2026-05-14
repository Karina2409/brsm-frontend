import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardStudent } from './event-card-student';

describe('EventCardStudent', () => {
    let component: EventCardStudent;
    let fixture: ComponentFixture<EventCardStudent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EventCardStudent],
        }).compileComponents();

        fixture = TestBed.createComponent(EventCardStudent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
