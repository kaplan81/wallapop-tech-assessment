import { DebugElement } from '@angular/core';

export interface ShallowComponentSuite<H> {
  host: ComponentTestingElement<H>;
}

export interface IntegrationComponentSuite<H, N> {
  host: ComponentTestingElement<H>;
  nested: ComponentTestingElement<N>;
}

export interface ComponentTestingElement<T> {
  component: T;
  debugEl: DebugElement;
  nativeEl: Element | HTMLElement;
}
