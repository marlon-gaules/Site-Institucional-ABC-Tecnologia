// Referência ao webservice em que será feito o cadastro
let urlCandidatos = "http://localhost:3000/candidatos";

$("#form-cadastro").on("submit", function(event){
    event.preventDefault();

    /* Capturar os dados informados no formulário */
    let sexo = $("input[name=sexo]:checked").val();
    let vaga = $("#vaga").find(":selected").text();

    // Montando um objeto com todos os dados capturados do form.
    let dados = {
        nome: $("#nome").val(),
        data: $("#data").val(),
        sexo: sexo,
        telefone: $("#telefone").val(),
        email: $("#email").val(),
        vaga: vaga
        
    };

    /* Ajax via JQuery: para fazer POST método gost */
    $.ajax({
        url: urlCandidatos,
        method: "post",
        data: dados,
        success: function(){

        },
        error: function(){
            console.log("Ops! Deu Ruim");
        }
    });

}); // fim da função de cadastro (formulário)


/* Função para leituras dos dados no webservice e carregamento na tabela de candidatos  */
$("#listar-candidatos").on("click", function(){
    // Acessando o Webservice via ajax: para leitura (GET)
    $.ajax({
        url: urlCandidatos,
        dataType: "json",
        method: "GET",
        success: function(resposta){
            $("#tabela-candidatos tbody tr").remove();
        
            // Loop $.each da JQuery
            $.each(resposta, function(indice, item){
                /* indice: é o indice numérico de cada elemento
                item: é cada conteúdo/dado do array */
                /* indice: é o índice numérico de cada elemento
                item: é cada conteúdo/dado do array */
                console.log(indice, item);

                // Criar a linha (tr)
                let linha = $("<tr>");

                // Criar as colunas (td)
                let colunas = `<td>${item.id}</td>
                                <td>${item.nome}</td>
                                <td>${item.telefone}</td>`;
                
                // Adicionar as colunas na linha
                linha.append(colunas);

                // Adicionar ao corpo da tabela 
                // a linha/coluna criada
                $("#tabela-candidatos tbody").append(linha);
   
            });
        },
        error: function(erro){
            console.log(erro.responseText);
        }
    })
});