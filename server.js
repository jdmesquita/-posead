const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://jdmesquita1979:O0kzRQiQSh1P99U5@poseadescomplica.myq9d.mongodb.net/?retryWrites=true&w=majority&appName=poseadescomplica', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Definir um modelo para o formulário
const FormularioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    dataAcao: String,
    municipio: String,
    clima: String,
    objetivo: [String],
    movimento: String,
    periodo: String,
    publico: [String],
    opiniao: String,
    colaboradores: String,
});
const Formulario = mongoose.model('Formulario', FormularioSchema);

// Rota para salvar os dados do formulário
app.post('/salvar-formulario', async (req, res) => {
    try {
        const novoFormulario = new Formulario(req.body); // Cria um novo documento com os dados recebidos
        await novoFormulario.save(); // Salva no MongoDB
        res.status(201).json({ message: "Formulário salvo com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar o formulário", error: error.message });
    }
});

// Rota para buscar todos os dados do formulário
app.get('/buscar-dados', async (req, res) => {
    try {
        const dados = await Formulario.find(); // Busca todos os documentos na coleção
        res.json(dados); // Retorna os dados como JSON
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar dados", error: error.message });
    }
});

// Rota para buscar dados formatados para os gráficos
const formDataSchema = new mongoose.Schema({
    municipio: String,
    dataAcao: String,
    publico: String,
    clima: String
});

const FormData = mongoose.model('FormData', formDataSchema);

// Rota para buscar os dados
app.get('/api/formData', async (req, res) => {
    try {
        const formDataArray = await Formulario.find({}, 'municipio dataAcao publico clima'); // Pegando apenas os campos necessários
        res.json(formDataArray);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar os dados", error: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});