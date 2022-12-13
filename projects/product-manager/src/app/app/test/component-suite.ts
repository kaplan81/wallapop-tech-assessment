import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ComponentTestingElement,
  IntegrationComponentSuite,
  ShallowComponentSuite,
} from '../models/component-suite.model';

export class ComponentSuite<H, N = any> {
  elements!: ShallowComponentSuite<H> | IntegrationComponentSuite<H, N>;

  constructor(private fixture: ComponentFixture<H>, private selector?: string) {
    this.setElements();
  }

  private getHost(): ComponentTestingElement<H> {
    const component: H = this.fixture.componentInstance;
    const debugEl: DebugElement = this.fixture.debugElement;
    const nativeEl: Element | HTMLElement = debugEl.nativeElement;
    return { component, debugEl, nativeEl };
  }

  private getIntegrationElements(): IntegrationComponentSuite<H, N> {
    const host: ComponentTestingElement<H> = this.getHost();
    const nested: ComponentTestingElement<N> = this.getNested(host.debugEl);
    return {
      host,
      nested,
    };
  }

  private getNested(hostDebugEl: DebugElement): ComponentTestingElement<N> {
    if (this.selector === undefined) {
      throw Error('ComponentSuite did not generate a nested element');
    }
    const debugEl: DebugElement = hostDebugEl.query(By.css(this.selector));
    const component: N = debugEl.componentInstance;
    const nativeEl: Element | HTMLElement = debugEl.nativeElement;
    return { component, debugEl, nativeEl };
  }

  private getShallowElements(): ShallowComponentSuite<H> {
    return { host: this.getHost() };
  }

  private setElements(): void {
    if (this.selector) {
      this.elements = this.getIntegrationElements();
    } else {
      this.elements = this.getShallowElements();
    }
  }
}
