import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingAvergeComponent } from './moving-averge.component';

describe('MovingAvergeComponent', () => {
  let component: MovingAvergeComponent;
  let fixture: ComponentFixture<MovingAvergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovingAvergeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovingAvergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
