export interface IObserver {
  update(stockName: string, price: number): void;
}
