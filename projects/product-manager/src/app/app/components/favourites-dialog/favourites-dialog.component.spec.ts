import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { FavouritesDialogComponent } from './favourites-dialog.component';

describe('FavouritesDialogComponent', () => {
  let fixture: ComponentFixture<FavouritesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
    fixture = TestBed.createComponent(FavouritesDialogComponent);
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
