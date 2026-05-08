import { IObserver } from './IObserver';

export class DOMPriceDisplay implements IObserver {
  private elementId: string;
  private lastPrice: number | null = null;

  constructor(elementId: string) {
    this.elementId = elementId;
  }

  public update(stockName: string, price: number): void {
    const el = document.getElementById(this.elementId);
    if (el) {
      el.textContent = `R$ ${price.toFixed(2)}`;
      
      // Efeito visual de destaque
      el.classList.remove('highlight');
      void el.offsetWidth; // Trigger reflow
      el.classList.add('highlight');
      
      // Cor de acordo com variação (verde para subida, vermelho para descida)
      if (this.lastPrice !== null) {
        if (price > this.lastPrice) {
          el.style.color = '#10b981'; // verde
        } else if (price < this.lastPrice) {
          el.style.color = '#ef4444'; // vermelho
        }
      }
      this.lastPrice = price;
    }
  }
}

export class DOMLogger implements IObserver {
  private containerId: string;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  public update(stockName: string, price: number): void {
    const container = document.getElementById(this.containerId);
    if (container) {
      const logEntry = document.createElement('div');
      logEntry.className = 'log-entry';
      
      const time = new Date().toLocaleTimeString();
      
      logEntry.innerHTML = `
        <span class="log-time">[${time}]</span>
        <span class="log-message">Ação ${stockName} atualizada para R$${price.toFixed(2)}</span>
      `;
      
      container.prepend(logEntry); // Adiciona no topo
    }
  }
}
