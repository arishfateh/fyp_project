import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayViewComponent } from './stay-view.component';

describe('StayViewComponent', () => {
  let component: StayViewComponent;
  let fixture: ComponentFixture<StayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
