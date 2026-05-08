import { StockMarket } from './StockMarket';
import { DOMPriceDisplay, DOMLogger } from './DOMPriceDisplay';

// Inicialização da interface Web
document.addEventListener('DOMContentLoaded', () => {
  // 1. Instanciando o Subject
  const petrobrasStock = new StockMarket('PETR4', 35.50);

  // 2. Criando observadores para a Web
  const displayAlfa = new DOMPriceDisplay('display-alfa');
  const displayBeta = new DOMPriceDisplay('display-beta');
  const domLogger = new DOMLogger('logs-container');

  // 3. Registrando observadores
  petrobrasStock.attach(displayAlfa);
  petrobrasStock.attach(displayBeta);
  petrobrasStock.attach(domLogger);

  // 4. Elementos da UI Principal
  const currentPriceEl = document.getElementById('current-price') as HTMLSpanElement;
  const inputPrice = document.getElementById('input-price') as HTMLInputElement;
  
  const btnIncrease = document.getElementById('btn-increase') as HTMLButtonElement;
  const btnDecrease = document.getElementById('btn-decrease') as HTMLButtonElement;
  const btnSet = document.getElementById('btn-set') as HTMLButtonElement;
  
  const btnToggleBeta = document.getElementById('btn-toggle-beta') as HTMLButtonElement;

  // Função helper para atualizar a UI do Subject
  const updateSubjectUI = (price: number) => {
    const previous = parseFloat(currentPriceEl.textContent || '0');
    currentPriceEl.textContent = price.toFixed(2);
    
    if (price > previous) {
      currentPriceEl.classList.remove('down');
    } else if (price < previous) {
      currentPriceEl.classList.add('down');
    }
  };

  // Inicializa a UI do Subject e os Observers com o valor inicial
  updateSubjectUI(petrobrasStock.getPrice());
  petrobrasStock.notify(); // Força a primeira notificação para atualizar a UI dos observers

  // 5. Eventos de Interação
  btnIncrease.addEventListener('click', () => {
    const newPrice = petrobrasStock.getPrice() + 0.50;
    petrobrasStock.setPrice(newPrice);
    updateSubjectUI(newPrice);
  });

  btnDecrease.addEventListener('click', () => {
    const newPrice = petrobrasStock.getPrice() - 0.50;
    petrobrasStock.setPrice(newPrice);
    updateSubjectUI(newPrice);
  });

  btnSet.addEventListener('click', () => {
    const val = parseFloat(inputPrice.value);
    if (!isNaN(val) && val > 0) {
      petrobrasStock.setPrice(val);
      updateSubjectUI(val);
      inputPrice.value = '';
    }
  });

  // Controle de conexão do Observer Beta
  let betaConnected = true;
  btnToggleBeta.addEventListener('click', () => {
    if (betaConnected) {
      petrobrasStock.detach(displayBeta);
      btnToggleBeta.textContent = 'Conectar';
      btnToggleBeta.classList.add('btn-primary');
      btnToggleBeta.classList.remove('btn-outline');
      const el = document.getElementById('display-beta');
      if (el) {
        el.textContent = 'Desconectado';
        el.style.color = '#94a3b8';
      }
    } else {
      petrobrasStock.attach(displayBeta);
      btnToggleBeta.textContent = 'Desconectar';
      btnToggleBeta.classList.remove('btn-primary');
      btnToggleBeta.classList.add('btn-outline');
      // Força a atualização com o valor atual ao reconectar
      displayBeta.update(petrobrasStock.getStockName(), petrobrasStock.getPrice());
    }
    betaConnected = !betaConnected;
  });
});
