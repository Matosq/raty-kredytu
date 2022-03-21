import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTitleComponent } from './field-title.component';

describe('FieldTitleComponent', () => {
  let component: FieldTitleComponent;
  let fixture: ComponentFixture<FieldTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
