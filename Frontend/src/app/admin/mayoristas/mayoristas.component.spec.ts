import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayoristasComponent } from './mayoristas.component';

describe('MayoristasComponent', () => {
  let component: MayoristasComponent;
  let fixture: ComponentFixture<MayoristasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayoristasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MayoristasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
