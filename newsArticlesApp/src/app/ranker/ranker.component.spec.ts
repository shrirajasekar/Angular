import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankerComponent } from './ranker.component';

describe('RankerComponent', () => {
  let component: RankerComponent;
  let fixture: ComponentFixture<RankerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
