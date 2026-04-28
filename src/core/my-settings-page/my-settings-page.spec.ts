import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySettingsPage } from './my-settings-page';

describe('MySettingsPage', () => {
    let component: MySettingsPage;
    let fixture: ComponentFixture<MySettingsPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MySettingsPage],
        }).compileComponents();

        fixture = TestBed.createComponent(MySettingsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
