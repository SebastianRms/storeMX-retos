import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMesaggeComponent } from './error-mesagge.component';

describe('ErrorMesaggeComponent', () => {
  let component: ErrorMesaggeComponent;
  let fixture: ComponentFixture<ErrorMesaggeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMesaggeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMesaggeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
