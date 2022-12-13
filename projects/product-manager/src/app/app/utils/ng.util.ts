import { NgZone } from '@angular/core';

export const ensureAngularZone = (zone: NgZone, fn: () => any): any => {
  return NgZone.isInAngularZone() ? fn() : zone.run(fn);
};
