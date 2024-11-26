import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaqueteComponent } from './card-paquete.component';

describe('CardPaqueteComponent', () => {
  let component: CardPaqueteComponent;
  let fixture: ComponentFixture<CardPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPaqueteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
