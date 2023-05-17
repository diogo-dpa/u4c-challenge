# Desafio U4C

## 🧶 Sobre o desafio

Trata-se de modelar e implementar uma API Restful para uma empresa de proteção veicular.

Houve uma série de requisitos para serem desenvolvidos que estão disponíveis como funcionalidades no projeto.

## 🛠 Tecnologias Utilizadas

No projeto utilizou-se:

- **Typescript** para escrita do código com tipagem estática
- **HapiJS** como biblioteca para criação da API
- **TypeORM** como conexão para criar e manipular o banco de dados por meio de queries pré processadas
- **Postgres** como banco de dados relacional
- **Jest** como ferramenta de teste
- **Docker** para prover o banco de dados em container cm facilidade

## 🧠 Como rodar o projeto

Primeiramente, no terminal instale as dependências do projeto com

```
npm install
```

Depois rode o comando

```
docker-compose up
```

para iniciar o banco de dados Postgres.

Por último, escreva

```
npm start
```

para iniciar a aplicação.
