const { response, request } = require('express')

const Pool = require('pg').Pool
const db = new Pool({
    host:'localhost',
    database:'dailygrind_db',
    user:'postgres',
    password:'123456',
    port: 5432
})

const getUsuario = (request, response) => {
    db.query('SELECT * FROM USUARIO ORDER BY IDUSUARIO',
    (error, results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getConquista = (request, response) => {
    db.query('SELECT * FROM CONQUISTAS ORDER BY IDCONQUISTA',
    (error, results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTarefa = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM TAREFA WHERE IDUSUARIO = $1  ORDER BY idtarefa', [id],
    (error, results)=> {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsuarioById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM USUARIO WHERE IDUSUARIO = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getConquistaById = (request, response) => {
    const id = parseInt(request.params.id)

    db.query('SELECT * FROM CONQUISTA WHERE IDCONQUISTA = $1', [id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getTarefaById = (request, response) => {
    const idtarefa = parseInt(request.params.idtarefa)

    db.query('SELECT * FROM TAREFA WHERE IDTAREFA = $1', [idtarefa],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createUsuario = (request, response) => {
    try{
        const {senha, email, apelido, pontos_recompensa} = request.body

        db.query('INSERT INTO USUARIO(senha, email, apelido, pontos_recompensa) VALUES($1, $2, $3, $4)',
        [senha, email, apelido, pontos_recompensa], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Usuario adicionado')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir o registro. ' + error
        })
    }
}
const createConquista = (request, response) => {
    try{
        const {imagem, descricao} = request.body

        db.query('INSERT INTO CONQUISTA(imagem, descricao) VALUES($1, $2)',
        [imagem, descricao], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Conquista adicionada')
        })
    }catch(error){
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir a Conquista.' + error
        })
    }
}
const createTarefa = (request, response) => {
    try{
        const {descricao, pontos_recompensa, idusuario} = request.body
        db.query('INSERT INTO TAREFA (descricao, pontos_recompensa, idusuario) VALUES($1, $2, $3)',
        [descricao, pontos_recompensa, idusuario], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('Tarefa adicionada')
        })
    }catch(error){
        console.log(pontos_recompensa);
        console.log('Erro: ' + error)
        response.status(400).send({
            status:400,
            message:'Error ao inserir a tarefa.' + error
        })
    }
}
const updateUsuario = (request, response) => {
    const idusuario = parseInt(request.params.id)
    const {senha, email, apelido, pontos_recompensa} = request.body

    db.query('UPDATE usuario SET senha = $1,email = $2, apelido = $3, pontos_recompensa = $4 WHERE idusuario = $5',
    [senha, email, apelido, pontos_recompensa,  idusuario], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Usuario atualizado')
    })
}
const updateConquista = (request, response) => {
    const idconquista = parseInt(request.params.id)
    const {imagem, descricao} = request.body

    db.query('UPDATE CONQUISTA SET IMAGEM = $1, DESCRICAO = $2 WHERE idconquista = $3',
    [imagem, descricao], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Conquista atualizada')
    })
}
const updateTarefa = (request, response) => {
    const idtarefa = parseInt(request.params.id)
    const {descricao, pontos_recompensa} = request.body

    db.query('UPDATE TAREFA SET DESCRICAO = $1, PONTOS_RECOMPENSA = $2 WHERE idtarefa = $3',
    [descricao, pontos_recompensa, idtarefa], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Tarefa atualizada')
    })
}
const deleteUsuario = (request, response) => {
    const idusuario = parseInt(request.params.id)

    db.query('DELETE FROM usuario WHERE idusuario = $1', [idusuario],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}
const deleteConquista = (request, response) => {
    const idconquista = parseInt(request.params.id)

    db.query('DELETE FROM conquista WHERE idconquista = $1', [idconquista],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}
const deleteTarefa = (request, response) => {
    const idtarefa = parseInt(request.params.id)

    db.query('DELETE FROM tarefa WHERE idtarefa = $1', [idtarefa],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('deletada')
    })
}
module.exports = {
    getUsuario,
    getConquista,
    getTarefa,
    getUsuarioById,
    getConquistaById,
    getTarefaById,
    createUsuario,
    createConquista,
    createTarefa,
    updateUsuario,
    updateConquista,
    updateTarefa,
    deleteUsuario,
    deleteConquista,
    deleteTarefa,
}