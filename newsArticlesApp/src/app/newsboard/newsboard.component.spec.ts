import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsboardComponent } from './newsboard.component';

describe('NewsboardComponent', () => {
  let component: NewsboardComponent;
  let fixture: ComponentFixture<NewsboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
