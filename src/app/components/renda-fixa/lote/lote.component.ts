import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Operacao {
  quantidade: number;
  cnpj: string;
  taxa: number;
  valorTotal: number;
}

@Component({
  selector: 'app-lote',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CurrencyPipe],
  template: `
    <div class="lote-container">
      <h2>Cadastro de Lote</h2>

      <div class="form-group">
        <label>Produto:</label>
        <select [(ngModel)]="produtoSelecionado" class="form-control">
          <option value="">Selecione um produto</option>
          <option *ngFor="let produto of produtos" [value]="produto.id">
            {{produto.nome}}
          </option>
        </select>
      </div>

      <div class="table-container">
        <div class="table-actions">
          <button (click)="adicionarOperacao()" class="action-button">
            <span class="icon">+</span> Adicionar Linha
          </button>
          <button (click)="limparTabela()" class="action-button">
            <span class="icon">🗑️</span> Limpar Tabela
          </button>
          <button (click)="copiarDados()" class="action-button">
            <span class="icon">📋</span> Copiar Dados
          </button>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Quantidade</th>
              <th>CNPJ</th>
              <th>Taxa (%)</th>
              <th>Valor Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let operacao of operacoes; let i = index"
                [class.invalid]="!isOperacaoValida(operacao)">
              <td>{{i + 1}}</td>
              <td>
                <input type="number" [(ngModel)]="operacao.quantidade"
                       (change)="calcularValorTotal(i)"
                       class="table-input"
                       min="0"
                       step="0.01">
              </td>
              <td>
                <input type="text" [(ngModel)]="operacao.cnpj"
                       (input)="formatarCNPJ(i)"
                       class="table-input"
                       maxlength="18"
                       placeholder="00.000.000/0000-00">
              </td>
              <td>
                <input type="number" [(ngModel)]="operacao.taxa"
                       (change)="calcularValorTotal(i)"
                       class="table-input"
                       min="0"
                       step="0.01">
              </td>
              <td>
                <span>{{operacao.valorTotal | currency:'BRL'}}</span>
              </td>
              <td>
                <button (click)="removerOperacao(i)" class="action-button">
                  <span class="icon">🗑️</span>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right"><strong>Total:</strong></td>
              <td><strong>{{calcularTotalGeral() | currency:'BRL'}}</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="form-actions">
        <button (click)="salvar()"
                [disabled]="!isFormularioValido()"
                class="submit-button">
          Salvar
        </button>
      </div>
    </div>
  `,
  styles: [`
    .lote-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .table-container {
      margin: 20px 0;
      overflow-x: auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th,
    .data-table td {
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
    }
    .data-table th {
      background-color: #f8f9fa;
      font-weight: 600;
      position: sticky;
      top: 0;
    }
    .data-table tbody tr:hover {
      background-color: #f8f9fa;
    }
    .data-table tr.invalid {
      background-color: #fff3f3;
    }
    .table-input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .table-input:focus {
      outline: none;
      border-color: #007bff;
    }
    .table-input:invalid {
      border-color: #dc3545;
    }
    .table-actions {
      display: flex;
      gap: 10px;
      padding: 10px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #ddd;
    }
    .action-button {
      padding: 8px 16px;
      background-color: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .action-button:hover {
      background-color: #e9ecef;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    .submit-button {
      padding: 12px 24px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .submit-button:hover {
      background-color: #0056b3;
    }
    .submit-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .text-right {
      text-align: right;
    }
    .icon {
      font-size: 1.2em;
    }
  `]
})
export class LoteComponent implements OnInit {
  produtos = [
    { id: 1, nome: 'CDB' },
    { id: 2, nome: 'LCI' },
    { id: 3, nome: 'LCA' }
  ];
  produtoSelecionado: number | null = null;
  operacoes: Operacao[] = [];

  constructor() {
    this.adicionarOperacao();
  }

  ngOnInit(): void {}

  adicionarOperacao(): void {
    this.operacoes.push({
      quantidade: 0,
      cnpj: '',
      taxa: 0,
      valorTotal: 0
    });
  }

  removerOperacao(index: number): void {
    this.operacoes.splice(index, 1);
  }

  limparTabela(): void {
    this.operacoes = [];
    this.adicionarOperacao();
  }

  calcularValorTotal(index: number): void {
    const operacao = this.operacoes[index];
    operacao.valorTotal = operacao.quantidade * operacao.taxa;
  }

  formatarCNPJ(index: number): void {
    let cnpj = this.operacoes[index].cnpj.replace(/\D/g, '');
    if (cnpj.length > 14) {
      cnpj = cnpj.substring(0, 14);
    }
    if (cnpj.length > 12) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else if (cnpj.length > 8) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
    } else if (cnpj.length > 5) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (cnpj.length > 2) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})/, '$1.$2');
    }
    this.operacoes[index].cnpj = cnpj;
  }

  isOperacaoValida(operacao: Operacao): boolean {
    return operacao.quantidade > 0 &&
           operacao.taxa > 0 &&
           operacao.cnpj.length === 18;
  }

  isFormularioValido(): boolean {
    return this.produtoSelecionado !== null &&
           this.operacoes.length > 0 &&
           this.operacoes.every(op => this.isOperacaoValida(op));
  }

  calcularTotalGeral(): number {
    return this.operacoes.reduce((total, op) => total + op.valorTotal, 0);
  }

  copiarDados(): void {
    const dados = this.operacoes.map(op => ({
      quantidade: op.quantidade,
      cnpj: op.cnpj,
      taxa: op.taxa,
      valorTotal: op.valorTotal
    }));
    navigator.clipboard.writeText(JSON.stringify(dados, null, 2));
    alert('Dados copiados para a área de transferência!');
  }

  salvar(): void {
    if (this.isFormularioValido()) {
      console.log('Dados salvos:', {
        produto: this.produtoSelecionado,
        operacoes: this.operacoes,
        totalGeral: this.calcularTotalGeral()
      });
      // Aqui você implementaria a lógica para salvar os dados
    }
  }
}
