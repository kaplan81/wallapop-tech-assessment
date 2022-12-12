/* eslint-disable */
/**
 * Copy and paste this snippet when implementing a unit test for a service.
 * @TODO schematic.
 */

import { inject, TestBed } from '@angular/core/testing';

describe('MyService', () => {
  let myService: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyService],
    });
    myService = TestBed.inject(MyService);
  });

  it('can be instantiated via DI', inject([MyService], (injectedService: MyService) => {
    expect(injectedService).toEqual(myService);
  }));
});
