import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionEditComponent } from './attraction-edit.component';

describe('AttractionEditComponent', () => {
  let component: AttractionEditComponent;
  let fixture: ComponentFixture<AttractionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
