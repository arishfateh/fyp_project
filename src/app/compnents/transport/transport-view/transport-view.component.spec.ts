import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportViewComponent } from './transport-view.component';

describe('TransportViewComponent', () => {
  let component: TransportViewComponent;
  let fixture: ComponentFixture<TransportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
