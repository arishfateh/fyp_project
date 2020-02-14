import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedtransportViewComponent } from './fixedtransport-view.component';

describe('FixedtransportViewComponent', () => {
  let component: FixedtransportViewComponent;
  let fixture: ComponentFixture<FixedtransportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedtransportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedtransportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
