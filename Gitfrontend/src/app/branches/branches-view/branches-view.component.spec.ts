import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesViewComponent } from './branches-view.component';

describe('BranchesViewComponent', () => {
  let component: BranchesViewComponent;
  let fixture: ComponentFixture<BranchesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
