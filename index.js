import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch'; 
import pg from 'pg';

dotenv.config();

const { Client } = pg;
const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
});

async function conectar() {
    await client.connect();
    console.log('Conectado ao banco de dados!');
}

conectar();

const app = express();
app.use(express.json());
app.use(express.static('static'));  

app.get('/estados', async (req, res) => {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = await response.json();
        res.json(estados);
    } 
    catch (error) {
        console.error('Erro ao buscar estados:', error);
        res.status(500).json({ error: 'Erro ao buscar estados' });
    }
});

app.get('/municipios/:estadoId', async (req, res) => {
    const estadoId = req.params.estadoId;
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
        const municipios = await response.json();
        res.json(municipios);
    } 
    catch (error) {
        console.error('Erro ao buscar municípios:', error);
        res.status(500).json({ error: 'Erro ao buscar municípios' });
    }
});

app.get('/svg/:estado/:municipio', async (req, res) => {
    const estado = req.params.estado;
    const municipio = req.params.municipio;

    try {
        const pathEstado = await client.query('SELECT ST_AsSVG(geom) FROM estado WHERE nm_uf ILIKE $1', [estado]);
        const pathMunicipio = await client.query('SELECT ST_AsSVG(geom) FROM municipios WHERE nm_mun ILIKE $1', [municipio]);
        const viewBox = await client.query('SELECT getViewBox($1)', [estado]);

        res.json({
            pathestado: pathEstado.rows[0].st_assvg,
            pathmunicipios: pathMunicipio.rows[0].st_assvg,
            viewBox: viewBox.rows[0].getviewbox
        });
    } 
    catch (error) {
        console.error('Erro ao buscar SVG:', error);
        res.status(500).json({ error: 'Erro ao buscar SVG' });
    }
});

app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000');
});
