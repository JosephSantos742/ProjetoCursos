const telefone = document.getElementById('telefone') // Pegando o valor do campo telefone.

telefone.addEventListener('keypress', (e) => mascaraTelefone(e.target.value)) // Coloca a mascara enquanto digita o campo
telefone.addEventListener('change', (e) => mascaraTelefone(e.target.value)) // Coloca a mascara quando tira foco do campo

// Máscara para o campo de telefone nos forms, permitindo salvar tanto números fixos e móveis.
const mascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    telefone.value = valor // Insere o(s) valor(es) no campo
}

let data = new Date();
let ano = data.getFullYear()

//  function para limpar os campos do formulário
const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

// function para preencher os campos caso o cep seja válido
const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

// uso de expressões regulares para permitir somente numeros de 0 a 9
const eNumero = (numero) => /^[0-9]+$/

const cepValido =(cep) => cep.length == 8 && eNumero(cep);

const pesquisaCep = async () =>{
    
    limparFormulario();

    const cep = document.getElementById('cep').value;

    // passando um cep para a api do VIACEP, caso for valido vai retornar um json com os dados
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();

        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado'
        }else{
            preencherFormulario(endereco)
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto'
    }
    
}

document.getElementById('cep').addEventListener('focusout', pesquisaCep);
        