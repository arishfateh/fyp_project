import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayAddComponent } from './stay-add.component';

describe('StayAddComponent', () => {
  let component: StayAddComponent;
  let fixture: ComponentFixture<StayAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
