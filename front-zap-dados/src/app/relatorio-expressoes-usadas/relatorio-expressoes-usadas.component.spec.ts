import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioExpressoesUsadasComponent } from './relatorio-expressoes-usadas.component';

describe('RelatorioExpressoesUsadasComponent', () => {
  let component: RelatorioExpressoesUsadasComponent;
  let fixture: ComponentFixture<RelatorioExpressoesUsadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioExpressoesUsadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioExpressoesUsadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
