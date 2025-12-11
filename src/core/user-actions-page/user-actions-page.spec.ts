import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionsPage } from './user-actions-page';

describe('UserActionsPage', () => {
  let component: UserActionsPage;
  let fixture: ComponentFixture<UserActionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActionsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UserActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
