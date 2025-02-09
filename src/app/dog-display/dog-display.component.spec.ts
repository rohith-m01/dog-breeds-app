import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDisplayComponent } from './dog-display.component';

describe('DogDisplayComponent', () => {
  let component: DogDisplayComponent;
  let fixture: ComponentFixture<DogDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogDisplayComponent]
    });
    fixture = TestBed.createComponent(DogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
