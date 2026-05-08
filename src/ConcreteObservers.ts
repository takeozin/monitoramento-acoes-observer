import { IObserver } from './IObserver';

export class PriceDisplay implements IObserver {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  public update(stockName: string, price: number): void {
    console.log(`[PriceDisplay - ${this.id}] Atualização no painel: Ação ${stockName} está agora valendo R$${price.toFixed(2)}.`);
  }
}

export class PriceLogger implements IObserver {
  public update(stockName: string, price: number): void {
    const timestamp = new Date().toISOString();
    console.log(`[PriceLogger] LOG (${timestamp}): Preço da ação ${stockName} registrado no banco de dados com valor R$${price.toFixed(2)}.`);
  }
}
