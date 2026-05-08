import { IObserver } from './IObserver';

export class StockMarket {
  private observers: IObserver[] = [];
  private stockName: string;
  private price: number;

  constructor(stockName: string, initialPrice: number) {
    this.stockName = stockName;
    this.price = initialPrice;
  }

  // Registra um novo observador
  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  // Remove um observador existente
  public detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  // Notifica todos os observadores sobre a mudança de preço
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this.stockName, this.price);
    }
  }

  // Atualiza o preço da ação e notifica os observadores
  public setPrice(newPrice: number): void {
    console.log(`\n[StockMarket] O preço da ação ${this.stockName} mudou para R$${newPrice.toFixed(2)}.`);
    this.price = newPrice;
    this.notify();
  }

  public getPrice(): number {
    return this.price;
  }

  public getStockName(): string {
    return this.stockName;
  }
}
