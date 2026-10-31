import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAsiento } from './crear-asiento';

describe('CrearAsiento', () => {
  let component: CrearAsiento;
  let fixture: ComponentFixture<CrearAsiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAsiento],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearAsiento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
