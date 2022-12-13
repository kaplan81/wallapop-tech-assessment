import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ShallowComponentSuite } from '../../models/component-suite.model';
import { ComponentSuite } from '../../test/component-suite';
import { ensureAngularZone } from '../../utils/ng.util';
import { AppComponent } from './app.component';

export class MatDialogMock {
  dialogResult?: any;
  returnedData: any = {};

  open(): {
    afterClosed: () => Observable<any>;
  } {
    console.log('OPENING');
    return {
      afterClosed: () => of(this.returnedData),
    };
  }
}
const matDialog = new MatDialogMock();

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let els: ShallowComponentSuite<AppComponent>;
  let dialog: MatDialog;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, MatDialogModule],
      providers: [{ provide: MatDialog, useValue: matDialog }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    els = new ComponentSuite(fixture).elements;
    dialog = TestBed.inject(MatDialog);
    els.host.component.dialog = dialog;
    ngZone = TestBed.inject(NgZone);
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should open dialog', () => {
    fixture.detectChanges();
    const openDialogSpy = jest.spyOn(matDialog, 'open');
    ensureAngularZone(ngZone, () => {
      els.host.component.openDialog();
    });
    expect(openDialogSpy).toHaveBeenCalled();
  });
});
