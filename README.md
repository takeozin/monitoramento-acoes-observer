# Monitoramento de Ações - Observer Pattern

**Implementação do padrão de projeto Observer para o Sistema de Monitoramento de Ações.**
Atividade da disciplina de Programação para Web - UNDB.

## Propósito Acadêmico

Este repositório foi criado com fins acadêmicos para demonstrar a compreensão e implementação do padrão de projeto arquitetural e comportamental **Observer**. O projeto é desenvolvido em **TypeScript** e ilustra como um sistema reativo pode ser projetado onde múltiplos componentes (Observadores) reagem automaticamente a mudanças de estado em um componente central (Sujeito).

## Estrutura do Projeto

- `src/StockMarket.ts`: Implementa o *Subject*, a classe central que mantém a lista de observadores e o preço atual das ações.
- `src/IObserver.ts`: Define a interface *Observer* padronizando o método `update()`.
- `src/ConcreteObservers.ts`: Contém implementações concretas de observadores (`PriceDisplay` e `PriceLogger`) que reagem às atualizações do *StockMarket*.
- `src/index.ts`: Arquivo principal contendo a simulação do sistema, instanciando os componentes e demonstrando a reatividade.

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o projeto diretamente usando `ts-node`:
   ```bash
   npm start
   ```

3. Ou compile para JavaScript e execute:
   ```bash
   npm run build
   node dist/index.js
   ```
