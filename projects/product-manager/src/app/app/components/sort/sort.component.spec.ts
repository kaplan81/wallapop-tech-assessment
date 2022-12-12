import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SortComponent } from './sort.component';

describe('SortComponent', () => {
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortComponent, NoopAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(SortComponent);
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
