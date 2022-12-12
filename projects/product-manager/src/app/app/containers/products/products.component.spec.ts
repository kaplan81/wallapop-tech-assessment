/* eslint-disable */
/**
 * Copy and paste this snippet when implementing a unit test for a component.
 * @TODO schematic.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MyComponent);
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
