import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointViewComponent } from './breakpoint-view.component';

describe('BreakpointViewComponent', () => {
  let component: BreakpointViewComponent;
  let fixture: ComponentFixture<BreakpointViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakpointViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
