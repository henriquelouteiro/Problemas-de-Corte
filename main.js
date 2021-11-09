var input = require('fs').readFileSync('data/Waescher_TEST0084.txt', 'utf8');   

var lines = input.split('\n'); 

/*
Para demandas definidas descomentar essa linha 
e desativar a outra
var tamanho = parseInt(lines[1]);
*/
var tamanho = 10000

const demanda = require('./demanda')
const quantidadeAbelhas = 30
const swaps = 30
const generations = 5

var resultInteractions = []
var auxDemanda = []
var auxResult = []
var resultForEach = []

var Barra = {
  tamanhoVariavel: tamanho,
  quantidadeUsada:0,
  tamanhoFixo: tamanho
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const resetAuxDemanda = () => { 
  auxDemanda = []
}


const init = () => {  
  for(let generation = 1; generation <= generations; generation++){
    console.log('Iteracao: ' + generation)

    if(generation === 1) {
      for(let abelha = 1; abelha <= quantidadeAbelhas; abelha++){ 
        resultForEach = []
        demanda.forEach(element => auxDemanda.push(Object.assign({}, element)))
        shuffleDemanda(auxDemanda)        
        resetAuxDemanda() 
        let bestResultForEach = resultForEach.reduce((previous, current) => previous.fitness > current.fitness ? previous : current)
        console.log(`Abelha ${abelha}, Fitness: ${bestResultForEach.fitness} Barras: ${bestResultForEach.Barras}`)
      }
      let bestFitness = auxResult.reduce((previous, current) => previous.fitness > current.fitness ? previous : current)
      resultInteractions.push(bestFitness.Barras)
    }else {
      var bestFitness = auxResult.reduce((previous, current) => previous.fitness > current.fitness ? previous : current)
      auxResult = []  

      for(let abelha = 1; abelha <= quantidadeAbelhas; abelha++) {
        resultForEach = []

        for(let indexSwap = 1; indexSwap <= swaps; indexSwap++){
          saveResults(buscaLocal(bestFitness.resultArray))  
        }
        let bestResultForEach = resultForEach.reduce((previous, current) => previous.fitness > current.fitness ? previous : current)
        console.log(`Abelha ${abelha}, Fitness: ${bestResultForEach.fitness} Barras: ${bestResultForEach.Barras}`)
      }
      let bestFitness2 = auxResult.reduce((previous, current) => previous.fitness > current.fitness ? previous : current)
      resultInteractions.push(bestFitness.Barras)
    }   
    console.log("----------------------------------") 
  }
}

const saveResults = (shuffledDemanda) => {
  var result = 0;
  shuffledDemanda.map(position => {
    result = Barra.tamanhoVariavel - demanda[position].tamanho 
    if(result > 0) {
      Barra.tamanhoVariavel = result
    }else {
      Barra.quantidadeUsada++
      Barra.tamanhoVariavel = Barra.tamanhoFixo - demanda[position].tamanho  
    }
  })  
  auxResult.push({  resultArray: shuffledDemanda , fitness: 100/Barra.quantidadeUsada, Barras: Barra.quantidadeUsada})
  resultForEach.push({  resultArray: shuffledDemanda , fitness: 100/Barra.quantidadeUsada, Barras: Barra.quantidadeUsada})
  Barra.quantidadeUsada = 0
  Barra.tamanhoVariavel = Barra.tamanhoFixo
}


function buscaLocal(shufflePositions){
  
  
  var firstPosition = getRandomIntInclusive(0,shufflePositions.length-1)
  var secondPosition = getRandomIntInclusive(0,shufflePositions.length-1)  
  
  while(firstPosition === secondPosition){
    secondPosition = getRandomIntInclusive(0,shufflePositions.length-1)
  }
  
  const firstPositionAux = shufflePositions[firstPosition]  

  shufflePositions[firstPosition] = shufflePositions[secondPosition]

  shufflePositions[secondPosition] = firstPositionAux
  
  return shufflePositions
}


const shuffleDemanda = (receivedDemanda) => {
  const lengthDemanda = receivedDemanda.length;
  var shufflePosition = []
  var count = 0
  
  while(count < lengthDemanda) {
    var randomPosition = getRandomIntInclusive(0, lengthDemanda - 1)
    if(receivedDemanda[randomPosition].completo !== 1 ) {
      if(receivedDemanda[randomPosition].quantidade === 1) {
        shufflePosition.push(randomPosition)
        receivedDemanda[randomPosition].quantidade = 0
        receivedDemanda[randomPosition].completo = 1
        count++
      }else {
        receivedDemanda[randomPosition].quantidade--
        shufflePosition.push(randomPosition)
      }
    }
  }

  for(let indexSwap = 1; indexSwap <= swaps; indexSwap++){
    saveResults(buscaLocal(shufflePosition))
  }
}

init()
console.log("===========================")
resultInteractions.forEach( (result,index) => {
  console.log(`Interacao: ${index+1} Menor Numero de Barras: ${result}`)
})
console.log("===========================")