import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverpaymentsComponent } from './overpayments.component';

describe('OverpaymentsComponent', () => {
  let component: OverpaymentsComponent;
  let fixture: ComponentFixture<OverpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverpaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
