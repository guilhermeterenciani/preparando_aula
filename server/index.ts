import express,{Request,Response} from 'express';
import mysql2 from 'mysql2/promise';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/pessoas', async (req:Request, res:Response) => {
    let banco = await mysql2.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'test'

    })
    let sql = 'SELECT * FROM pessoas';
    let result = await banco.query(sql);
    banco.end();
    res.send(JSON.stringify(result[0])).status(200);
    }
);
app.get('/pessoas/:id', async (req:Request, res:Response) => {
    let banco = await mysql2.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'test'
    })
    let sql = 'SELECT * FROM pessoas WHERE id = ?';
    let result = await banco.query(sql, [req.params.id]);
    banco.end();
    res.send(JSON.stringify(result[0])).status(200);
    }
);
app.post('/pessoas', async (req:Request, res:Response) => {
    let banco = await mysql2.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'test'
    })
    let sql = 'INSERT INTO pessoas (id, nome, idade) VALUES (?,?,?)';
    let result = await banco.query(sql, [req.body.id,req.body.nome, req.body.idade]);
    banco.end();
    res.send(JSON.stringify({mensagem:"Cadastrado com sucesso"})).status(200);
    }
);
app.delete('/pessoas/:id', async (req:Request, res:Response) => {
    let banco = await mysql2.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'test'
    })
    let sql = 'DELETE FROM pessoas WHERE id = ?';
    let result = await banco.query(sql, [req.params.id]);
    banco.end();
    res.send(JSON.stringify({mensagem:"Deletado com sucesso"})).status(200);
});
app.put('/pessoas/:id', async (req:Request, res:Response) => {
    let banco = await mysql2.createConnection({
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'test'
    })
    let sql = 'UPDATE pessoas SET nome = ?, idade = ? WHERE id = ?';
    let result = await banco.query(sql, [req.body.nome, req.body.idade, req.params.id]);
    banco.end();
    res.send(JSON.stringify({mensagem:"Atualizado com sucesso"})).status(200);
});
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    }
    );