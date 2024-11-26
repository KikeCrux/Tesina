import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinatasComponent } from './pinatas.component';

describe('PinatasComponent', () => {
  let component: PinatasComponent;
  let fixture: ComponentFixture<PinatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinatasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PinatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
