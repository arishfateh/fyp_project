import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointAddComponent } from './breakpoint-add.component';

describe('BreakpointAddComponent', () => {
  let component: BreakpointAddComponent;
  let fixture: ComponentFixture<BreakpointAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakpointAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
