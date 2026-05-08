import { StockMarket } from './StockMarket';
import { PriceDisplay, PriceLogger } from './ConcreteObservers';

function main() {
  console.log("=== Inicializando o Sistema de Monitoramento de Ações (Observer Pattern) ===\n");

  // 1. Instanciando o Subject (StockMarket)
  const petrobrasStock = new StockMarket('PETR4', 35.50);

  // 2. Criando observadores (Concrete Observers)
  const displayCorretoraA = new PriceDisplay('Corretora Alfa');
  const displayCorretoraB = new PriceDisplay('Corretora Beta');
  const systemLogger = new PriceLogger();

  // 3. Registrando os observadores
  console.log("-> Registrando observadores...");
  petrobrasStock.attach(displayCorretoraA);
  petrobrasStock.attach(displayCorretoraB);
  petrobrasStock.attach(systemLogger);

  // 4. Simulando mudanças de preço (acionando notificações automáticas)
  petrobrasStock.setPrice(36.10);
  
  petrobrasStock.setPrice(35.90);

  // 5. Removendo um observador e alterando o preço novamente
  console.log("\n-> Removendo o observador 'Corretora Beta'...");
  petrobrasStock.detach(displayCorretoraB);
  
  petrobrasStock.setPrice(36.45);
}

// Executa a simulação
main();
