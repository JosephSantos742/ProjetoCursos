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