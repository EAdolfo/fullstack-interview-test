import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullRequestsCreateViewComponent } from './pull-requests-create-view.component';

describe('PullRequestsCreateViewComponent', () => {
  let component: PullRequestsCreateViewComponent;
  let fixture: ComponentFixture<PullRequestsCreateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullRequestsCreateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestsCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
