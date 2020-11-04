/* Preparação do IndexedDB */
let mensagemDb = $("#mensagem-db");
let requisicaoAbertura = indexedDB.open("DBCandidatos", 1);
let conexao;


requisicaoAbertura.onupgradeneeded = function(event){
    mensagemDb.text("Banco de dados pronto!");
    conexao = event.target.result;

    let objectStore = conexao.createObjectStore("candidatos", {
        keyPath: "email"
    })
};

requisicaoAbertura.onsuccess = function(event){
    mensagemDb.text("Conexão feita com sucesso!");
    conexao = event.target.result;
};

requisicaoAbertura.onerror = function(event){
    mensagemDb.text("Erro: "+event.target.error);    
};




/* Ouvinte de Evento para o formulário */
$("#form-cadastro").on("submit", function(event){
    event.preventDefault();

    // Capturando os dados preenchidos no formulário
    let sexo = $("input[name=sexo]:checked").val();
    let vaga = $("#vaga").find(":selected").text();
    let dados = {
        nome: $("#nome").val(),
        data: $("#data").val(),
        sexo: sexo,
        telefone: $("#telefone").val(),
        email: $("#email").val(),
        vaga: vaga
    };

    let transacao = conexao.transaction(["candidatos"], "readwrite");
    let store = transacao.objectStore("candidatos");
    let requisicaoGravacao = store.add(dados);

    requisicaoGravacao.onsuccess = function(event){
        mensagemDb.text("Dados incluídos com sucesso!");
    };

    requisicaoGravacao.onerror= function(event){
        mensagemDb.text("Erro: "+event.target.error);
    };

});


/* Ouvinte de Evento para um botão de carregamento dos dados do IndexedDB */
$("#listar-candidatos-db").on("click", function(){
    let listaCandidatos = $("#lista-candidatos");
    listaCandidatos.html(""); // Iniciar a lista vazia

    /* Acessar os dados */
    let transacao = conexao.transaction(["candidatos"], "readonly");
    let store = transacao.objectStore("candidatos");

    // Array para armarzenar em memória os dados dos candidatos
    let candidatos = [];

    // Criando um ponteiro/cursor que irá acessar os dados na store
    let cursor = store.openCursor();

    // Monitorar os eventos do cursor
    cursor.onsuccess = function(event){
        // Ponteiro (referência) para o candidato atualmente selecionado pelo cursor
        let ponteiro = event.target.result;

        // Se houver dados no ponteiro
        if(ponteiro){
            // Garde os valores(dados na variável)
            let dadosCandidato = ponteiro.value;

            // Adiciona os dados de cada candidato no array candidatos
            candidatos.push(dadosCandidato);

            // Vá para o próximo registro
            ponteiro.continue();
        } else {
            // Carregue os dados
            //console.table(candidatos);
            $.each(candidatos, function(indice, item){
                listaCandidatos.append(
                    `<li class="list-group-item">${item.nome}</li>`
                );
            });
        }
    };

    cursor.onerror = function(event){
      mensagemDb.text("Erro: "+event.target.error.nome);  
    };

}); // Fim da fução do botão