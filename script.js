const form = document.getElementById("form")
const nome = document.getElementById("nome")
const email = document.getElementById("email");

form.addEventListener("submit",(event) => {
    event.preventDefault();
    alert("Informações salvas com sucesso!")

})
        // Função para enviar dados por e-mail
        function enviarEmail() {
            const emailConteudo = formDataArray.map(formData =>
                `Nome: ${formData.nome}, Email: ${formData.email}, Data: ${formData.dataAcao}`
            ).join("\n");

            window.location.href = `mailto:?subject=Relatório de Dados&body=${encodeURIComponent(emailConteudo)}`;
        }
