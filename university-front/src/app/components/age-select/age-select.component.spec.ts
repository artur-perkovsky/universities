import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeSelectComponent } from './age-select.component';

describe('AgeSelectComponent', () => {
  let component: AgeSelectComponent;
  let fixture: ComponentFixture<AgeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
