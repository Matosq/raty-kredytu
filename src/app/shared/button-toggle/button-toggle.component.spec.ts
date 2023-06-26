import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToggleComponent } from './button-toggle.component';
import { Installments } from './installment.model';

describe('ButtonToggleComponent', () => {
  let component: ButtonToggleComponent<Installments>;
  let fixture: ComponentFixture<ButtonToggleComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
