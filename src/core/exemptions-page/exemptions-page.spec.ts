import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptionsPage } from './exemptions-page';

describe('ExemptionsPage', () => {
  let component: ExemptionsPage;
  let fixture: ComponentFixture<ExemptionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemptionsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ExemptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
