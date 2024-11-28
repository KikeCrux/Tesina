import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponenteComponent } from './card-componente.component';

describe('CardComponenteComponent', () => {
  let component: CardComponenteComponent;
  let fixture: ComponentFixture<CardComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
