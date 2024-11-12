import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoDePessoasComponent } from './fluxo-de-pessoas.component';

describe('FluxoDePessoasComponent', () => {
  let component: FluxoDePessoasComponent;
  let fixture: ComponentFixture<FluxoDePessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxoDePessoasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoDePessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
