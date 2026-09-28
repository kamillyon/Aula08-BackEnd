const express = require('express');
const app = express();
app.use(express.json());

const alunos = [
    {
        id: 1,
        nome: "Carlos Eduardo",
        notas: [
            {disciplina: "Matemática", nota: 5.0}
        ]
        
    },
    {
        id: 2,
        nome: "Ana Júlia Silva",
        notas: [
            {disciplina: "Português", nota: 8.5}
        ]
    },
    {
        id: 3,
        nome: "Mariana Oliveira",
        notas: [
            {disciplina: "Biologia", nota: 10.0}
        ]
    },
    {
        id: 4,
        nome: "João Pedro",
        notas: [
            {disciplina: "História", nota: 9.5}
        ]
    }
];

// 1. Exemplo com ROUTE PARAMS (req.params) - Identificador Único
app.get('/alunos/:id', (req, res) => {
    const {id} = req.params;
    const alunoEncontrado = alunos.find(a => a.id === Number(id));
        if (!alunoEncontrado) {
        return res.status(404).json({erro: `Aluno com ID ${id} não foi encontrado`});
    }
    res.status(200).json({id, nome: alunoEncontrado.nome, status: "Ativo"});
});

//2. Exemplo com QUERY PARAMS (req.query) - Filtro/Busca dinâmica
app.get('/alunos', (req, res) => {
    const {categoria, ordenacao} = req.query;
    res.status(200).json({
        mensagem: "Listagem de alunos filtrada com sucesso",
        alunos: alunos,
        filtrosAplicados: {
            categoria: categoria || "Todas",
            ordenacao: ordenacao || "padrao"
        }
    });
});

// 3. Exemplo com BODY (req.body) - Cadastro/Envio de dados JSON
app.post('/notas', (req, res) => {
    const {alunoID, disciplina, nota} = req.body;
    if (!alunoID || !disciplina || nota === undefined || nota === null) {
        return res.status(400).json({
            erro: `Informações incompletas. É obrigatório informar 'alunoID', 'disciplina' e 'nota'.`
        });
    }
    if (nota < 0 || nota > 10) {
        return res.status(400).json({
            erro: `A nota deve ser entre 0 e 10.`
        });
    }
    
    const alunoEncontrado = alunos.find(a => a.id === Number(alunoID));
    if (!alunoEncontrado) {
        return res.status(404).json({
            erro: `Aluno com ID ${alunoID} não foi encontrado`
        });
    }

    alunoEncontrado.notas.push({
        disciplina: disciplina,
        nota: Number(nota)
    })

    res.status(201).json({
        mensagem: "Nota cadastrada com sucesso!",
        aluno: alunoEncontrado
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express rodando em http://localhost:${PORT}`);
});