import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioUltimasMensagensComponent } from './relatorio-ultimas-mensagens.component';

describe('RelatorioUltimasMensagensComponent', () => {
  let component: RelatorioUltimasMensagensComponent;
  let fixture: ComponentFixture<RelatorioUltimasMensagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioUltimasMensagensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioUltimasMensagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
