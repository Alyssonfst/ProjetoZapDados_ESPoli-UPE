import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroComponentComponent } from './filtro-component.component';

describe('FiltroComponentComponent', () => {
  let component: FiltroComponentComponent;
  let fixture: ComponentFixture<FiltroComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
