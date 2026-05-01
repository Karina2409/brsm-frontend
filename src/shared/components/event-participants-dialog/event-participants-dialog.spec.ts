import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticipantsDialog } from './event-participants-dialog';

describe('EventParticipantsDialog', () => {
    let component: EventParticipantsDialog;
    let fixture: ComponentFixture<EventParticipantsDialog>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EventParticipantsDialog],
        }).compileComponents();

        fixture = TestBed.createComponent(EventParticipantsDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
