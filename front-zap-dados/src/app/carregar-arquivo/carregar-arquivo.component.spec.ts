import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregarArquivoComponent } from './carregar-arquivo.component';

describe('CarregarArquivoComponent', () => {
  let component: CarregarArquivoComponent;
  let fixture: ComponentFixture<CarregarArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarregarArquivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarregarArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
