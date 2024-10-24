// FRANCISCO DANTAS DA SILVA NETO - 2223879
// PEDRO ARTHUR RODRIGUES GONCALVES - 2224190
const MetodoGrafico = require('./MetodoGrafico.js');

class Main {
    static run() {
        // A função abaixo foi usada de exemplo para testar o funcionamento do código.
        // Ela foi tirada da Lista 1 (AV2), questão 2.

        const metodo = new MetodoGrafico(-2, -3, true);
        
        metodo.AddEq(1, 2, 5);  
        metodo.AddEq(2, 1, 6);  
        
        console.log("Equações:");
        metodo.ListEq();

        const solucao = metodo.GetSolution();
        
       if (Array.isArray(solucao)) {
            console.log(`Solução ótima: x = ${solucao[0]}, y = ${solucao[1]}`);
        } else {
            console.log(solucao);  
        }
    }
}

const metodo = new MetodoGrafico();

Main.run();
