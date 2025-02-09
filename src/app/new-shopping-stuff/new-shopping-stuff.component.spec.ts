import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShoppingStuffComponent } from './new-shopping-stuff.component';

describe('NewShoppingStuffComponent', () => {
  let component: NewShoppingStuffComponent;
  let fixture: ComponentFixture<NewShoppingStuffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewShoppingStuffComponent]
    });
    fixture = TestBed.createComponent(NewShoppingStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
