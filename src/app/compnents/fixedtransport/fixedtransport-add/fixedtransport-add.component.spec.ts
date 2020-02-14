import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedtransportAddComponent } from './fixedtransport-add.component';

describe('FixedtransportAddComponent', () => {
  let component: FixedtransportAddComponent;
  let fixture: ComponentFixture<FixedtransportAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedtransportAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedtransportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
