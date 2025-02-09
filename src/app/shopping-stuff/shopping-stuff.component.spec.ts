import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingStuffComponent } from './shopping-stuff.component';

describe('ShoppingStuffComponent', () => {
  let component: ShoppingStuffComponent;
  let fixture: ComponentFixture<ShoppingStuffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingStuffComponent]
    });
    fixture = TestBed.createComponent(ShoppingStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
