import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryAddComponent } from './itinerary-add.component';

describe('ItineraryAddComponent', () => {
  let component: ItineraryAddComponent;
  let fixture: ComponentFixture<ItineraryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
