import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionAddComponent } from './attraction-add.component';

describe('AttractionAddComponent', () => {
  let component: AttractionAddComponent;
  let fixture: ComponentFixture<AttractionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
