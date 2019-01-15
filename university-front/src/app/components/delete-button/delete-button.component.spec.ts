import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonCityComponent } from './delete-button-city.component';

describe('DeleteButtonCityComponent', () => {
  let component: DeleteButtonCityComponent;
  let fixture: ComponentFixture<DeleteButtonCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteButtonCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteButtonCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
