const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const client = require('./connection');
const host = "localhost";
const port = 3001;
const cors = require('cors');

const path = require('path');
app.use(express.static(path.join(__dirname, 'views')));

app.use(cors());
app.use(bodyParser.json());

client.connect(err => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Connected')
    }
});

app.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`)
});

// get all
app.get('/pemesan', (req, res) => {
    client.query(`select * from pemesan`, (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send(result.rows)
        }
    })
});

// get id
app.get('/pemesan/id/:id_pemesan', (req, res) => {
    const { id_pemesan } = req.params;

    client.query(`select * from pemesan where id_pemesan = ${id_pemesan}`, (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send(result.rows)
        }
    })
});

// get nama
app.get('/pemesan/:nama', (req, res) => {
    const { nama } = req.params;

    client.query(`select * from pemesan where nama like '%${nama}%'`, (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send(result.rows);
        }
    })
});

// post
app.post('/pemesan', (req, res) => {
    const { id_pemesan, nama, email, nomor_telepon } = req.body;

    client.query(`insert into pemesan(id_pemesan, nama, email, nomor_telepon) 
        values(${id_pemesan},'${nama}','${email}', '${nomor_telepon}')`, (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send('Insert Berhasil')
        }
    })
});

// put
app.put('/pemesan/:id_pemesan', (req, res) => {
    const { id_pemesan } = req.params;
    const { nama, email, nomor_telepon } = req.body;

    client.query(`update pemesan set nama = '${nama}', email = '${email}', nomor_telepon = '${nomor_telepon}' where id_pemesan = ${id_pemesan}`, (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send('Update Berhasil')
        }
    })
});

//delete
app.delete('/pemesan/:id_pemesan', (req, res) => {
    const { id_pemesan } = req.params;

    client.query(`delete from pemesan where id_pemesan = ${id_pemesan}`, (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send('Delete Berhasil')
        }
    })
});