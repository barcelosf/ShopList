const divLista = document.getElementById("lista")
const fieldArray = document.getElementsByClassName('field-lista')
const buttonAdiciona = document.getElementById('adicionar')

function adicionaCampo(){
    // criando a div
    let divField = document.createElement('div')
    divField.classList.add('field-lista')
    divField.setAttribute('id', fieldArray.length+1)
    //criando o input de texto
    let inputText = document.createElement('input')
    inputText.setAttribute('type', 'text')
    inputText.setAttribute("placeholder", "Digite o item")
    inputText.setAttribute('id', fieldArray.length+1)
    inputText.setAttribute("required", true)
    //criando o input de valor
    let inputNumber = document.createElement('input')
    inputNumber.setAttribute('type', 'number')
    inputNumber.setAttribute('placeholder', 'Valor')
    inputNumber.setAttribute('id', fieldArray.length+1)
    inputNumber.setAttribute('required', true)
    //criando o botao de -
    let buttonRetira = document.createElement('button')
    buttonRetira.setAttribute('id', fieldArray.length+1)
    buttonRetira.setAttribute('onclick', "eliminaCampo(event)")
    buttonRetira.innerHTML = '-'
    //adicionando os elementos na DOM
    divField.appendChild(inputText)
    divField.appendChild(inputNumber)
    divField.appendChild(buttonRetira)
    divLista.insertBefore(divField, buttonAdiciona)

}

function eliminaCampo(evento){
    evento.target.parentNode.remove()
}

function calculaPreco(){
    const inputNumber = document.querySelectorAll("main div#container div#lista div.field-lista input[type=number]")
    const valorTotal = document.getElementsByTagName("span")[0]
    const inputArray = Array.from(inputNumber)
    const numbersPuro = inputArray.map(number => parseFloat(number.value))
    const numbers = numbersPuro.map(function(number){
        if(isNaN(number)){
            number = 0.00
        }
        else{
            number = number
        }
        return number
    })
    const valor = numbers.reduce(function(acumulador,valorAtual){
        return acumulador + valorAtual
    })

    valorTotal.innerHTML = `R$ ${valor.toFixed(2)}`
}

function gerarPdf(){
    const titleInput = document.getElementById('title')
    const authorInput = document.getElementById('author')
    const valorSpan = document.getElementsByTagName('span')[0]
    const textInput = document.querySelectorAll("main div#container div#lista div.field-lista input[type=text]")
    const textArray = Array.from(textInput)
    const numberInput =  document.querySelectorAll("main div#container div#lista div.field-lista input[type=number]")
    const numberArray = Array.from(numberInput)
    const texts = textArray.map(text => text.value)
    const numbersPuro = numberArray.map(number => parseFloat(number.value))
    const numbers = numbersPuro.map(function(number){
        if(isNaN(number)){
            number = 0.00
        }
        else{
            number = number
        }
        return number
    })
    const title = titleInput.value
    const author = authorInput.value
    const value = valorSpan.innerText

    const lista = []

    for(let i = 0; i<texts.length;i++){
        lista[i] = `${texts[i]} = R$ ${numbers[i].toFixed(2)}`
    }

    const docDefinition = {
        header: {
            text: `${title} de ${author}`,
            style: "header"
        },
        content: [
            {
                ol: lista,
                style: "ol",
                margin: [0, 5]
            },
            {
                text: `O valor total é ${value}`,
                style: "text"
            }
        ],
        styles:{
            header:{
                alignment: "center",
                fontSize: 30,
                bold: true,
            },
            content: {
                alignment: "center",
            },
            ol:{
                fontSize: 15,
                bold: true
            },
            text:{
                bold: true,
                fontSize: 25,
                alignment: "center"
            }
        },
        info: {
            title: `${title}-${author}`
        }
    }
    pdfMake.createPdf(docDefinition).download();
}