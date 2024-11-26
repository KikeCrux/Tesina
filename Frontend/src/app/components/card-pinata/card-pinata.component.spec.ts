import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPinataComponent } from './card-pinata.component';

describe('CardPinataComponent', () => {
  let component: CardPinataComponent;
  let fixture: ComponentFixture<CardPinataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPinataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPinataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
