# Brazil_AsSVG

Este projeto é uma aplicação web interativa que exibe o mapa do Brasil. O usuário pode selecionar estados e municípios, e o mapa é atualizado em formato SVG, destacando a área escolhida.

---

## Funcionalidades

- **Estado:** Ao abrir a página, será exibida uma lista suspensa com todos os estados do Brasil.
- **Município:** Ao selecionar um estado, a lista de municípios desse estado será carregada automaticamente.
- **Mapa:** Quando um município for selecionado, o mapa do estado será exibido em formato SVG com o município destacado.

## Como Usar

### Requisitos

- Node.js e npm instalados na sua máquina.
- **PostgreSQL** com a extensão **PostGIS**.
- Baixe os dados dos estados e municípios no formato shapefile [aqui](https://www.ibge.gov.br/geociencias/organizacao-do-territorio/malhas-territoriais/15774-malhas.html).
- Importe os dados para o **QGIS** que deve está conectado ao banco de dados **PostgreSQL/PostGIS**.

### Passo a Passo

1. **Clone o repositório:**

```bash
git clone https://github.com/tatianysouza/Brazil_AsSVG.git
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o banco de dados:**
Configure o PostgreSQL e a extensão PostGIS, além de importar os dados do IBGE para o banco. No arquivo ```.env```, adicione:
```bash
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=seu_banco_de_dados
```

4. **Inicie o servidor com o comando:**
```bash
node index.js
```

5. **Acesse o aplicativo:**
Abra o navegador e acesse:
```bash
http://localhost:3000/index.html
```

## Contribuições

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir uma Issue ou fazer um Pull Request.