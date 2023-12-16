import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockIssueComponent } from './lock-issue.component';

describe('LockIssueComponent', () => {
  let component: LockIssueComponent;
  let fixture: ComponentFixture<LockIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
