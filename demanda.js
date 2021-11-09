function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var input = require('fs').readFileSync('data/Waescher_TEST0084.txt', 'utf8');    //no lugar de 'stdin' fica o nome do arquivo (se o arq estiver na mesma pasta)

var lines = input.split('\n'); //cria o vetor lines que contem em cada posição o que contem em sua respectiva linha 

var N_Itens_diferentes = parseInt(lines[0]);  // converte a variavel string para int 
var tamanho = parseInt(lines[1]);
var TamanhoItem = [], NumItem = [];

const demanda = []

for (let i = 2; i < lines.length-1; i++) {

    [TamanhoItem[i-2], NumItem[i-2]] = lines[i].split('	');
    
    TamanhoItem[i-2] = parseInt(TamanhoItem[i-2]);
    NumItem[i-2] = parseInt(NumItem[i-2]);
        
    demanda.push(
      {
        tamanho: TamanhoItem[i-2],
        quantidade: NumItem[i-2],
        completo: 0
      }
    )
}





/*
for (let i = 0; i < getRandomIntInclusive(26, 28); i++) {
  demanda.push(
    {
      tamanho: getRandomIntInclusive(287, 7500),
      quantidade: getRandomIntInclusive(20, 21),
      completo: 0
    }
  )
}
*/
module.exports = demanda;