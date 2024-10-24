const INF = 100000;

class MetodoGrafico {
    constructor(c1, c2, min) {
        this.c = [c1, c2];
        this.min = min; 

        this.Ab = [
            [-1, 0, 0],
            [1, 0, INF],
            [0, -1, 0],
            [0, 1, INF]
        ];
    }

    AddEq(a1, a2, b) {
        const new_eq = [a1, a2, b];
        this.Ab.push(new_eq);
    }

    ListEq() {
        this.Ab.forEach((eq, i) => {
            console.log(`Equacao ${i}: ${eq[0]}*x + ${eq[1]}*y = ${eq[2]}`);
        });
    }

    RemoveEq(k) {
        if (k < 4) {
            throw new Error("Não é permitido remover as equações 0, 1, 2, e 3");
        }
        this.Ab.splice(k, 1);
    }

    CheckPoint(x0, y0) {
        return this.Ab.every(eq => eq[0] * x0 + eq[1] * y0 <= eq[2]);
    }

    SolveSystem(eq1, eq2) {
        const [a1, b1, c1] = eq1;
        const [a2, b2, c2] = eq2;

        const det = a1 * b2 - a2 * b1;
        if (det === 0) {
            return null; 
        }

        const x = (c1 * b2 - c2 * b1) / det;
        const y = (a1 * c2 - a2 * c1) / det;

        return [x, y];
    }

    GetSolution() {
        const solutions = [];

        for (let i = 0; i < this.Ab.length; i++) {
            for (let j = i + 1; j < this.Ab.length; j++) {
                const result = this.SolveSystem(this.Ab[i], this.Ab[j]);
                if (result !== null) {
                    const [x, y] = result;
                    if (this.CheckPoint(x, y)) {
                        solutions.push([x, y]);
                    }
                }
            }
        }

        if (solutions.length === 0) {
            return "Nenhuma solução encontrada.";
        }

        const best_solution = this.min
            ? solutions.reduce((best, p) => (this.c[0] * p[0] + this.c[1] * p[1] < this.c[0] * best[0] + this.c[1] * best[1] ? p : best))
            : solutions.reduce((best, p) => (this.c[0] * p[0] + this.c[1] * p[1] > this.c[0] * best[0] + this.c[1] * best[1] ? p : best));

        const [x_opt, y_opt] = best_solution;

        if (x_opt === INF || y_opt === INF) {
            return "Função Ilimitada";
        }
        return [x_opt, y_opt];
    }
}

module.exports = MetodoGrafico;