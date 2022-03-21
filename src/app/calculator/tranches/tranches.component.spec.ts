import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranchesComponent } from './tranches.component';

describe('TranchesComponent', () => {
  let component: TranchesComponent;
  let fixture: ComponentFixture<TranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
