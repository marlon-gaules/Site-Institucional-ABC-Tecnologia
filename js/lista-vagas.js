/* Array vazio que recebará os dados das vagas */
let vagas = [];

/* Endpoint/url do fake webservice */
let url = "http://localhost:3000/vagas";

/* Selecionando o select de vagas */
let selectVagas = document.querySelector("#vaga");

/*  */
let opDesenvolvimento = document.querySelector("#desenvolvimento");
let opNegocios = document.querySelector("#negocios");

/* Ouvintes de evento para às opções dos tipos de vagas */
opDesenvolvimento.addEventListener("click", exibirVagas);
opNegocios.addEventListener("click", exibirVagas);

/* Acessar o webservice a consumir/ler os dados disponibilizados */
fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {
        vagas = dados;
        exibirVagas();
    });

function exibirVagas(){
    /* Ao exibirVagas, primeiro fazemos um reset da lista (select) */
    limparLista();

    /* Cache com quantidade de vagas */
    let qtdvagas = vagas.length;

    /* Varrendo os dados do array */
    for( let i = 0; i < vagas.length; i++ ){

        /* Armazenando o tipo de vaga */  
        let tipo = vagas[i].tipo;
        
        /* Determinando o tipo:
        Se opDesenvolvimento for selecionada e o tipo for 1, então mostre somente
        as vagas de desenvolvimento.
        OU
        Se opNegocios for selecionada e o tipo for 2, então mostre somente
        as vagas de negócios. */
        if( (opDesenvolvimento.checked && tipo == 1) || (opNegocios.checked && tipo == 2) ){

        // criando
        let option = document.createElement("option");

        // Montar um conteúdo
        option.textContent = vagas[i].titulo; //nome das vagas
        option.setAttribute("value", vagas[i].id); // id das vagas

        // Adicionar ao DOM (dentro do select de vagas)
        selectVagas.appendChild(option);
                
        }
    }   
}

function limparLista(){
    /* Enquanto houver um elemento no selectVagas... */
    while(selectVagas.firstChild){
        /* acesse o selectVagas e remova o elemento existente */
        selectVagas.removeChild(selectVagas.firstChild);
    }
}