# Teste Prático U4C 05/23

## 🧶 Sobre o teste

Trata-se de modelar e implementar uma API Restful para uma empresa de proteção veicular.

Uma lista de requisitos foi demandada para serem desenvolvidas, que estão disponíveis como funcionalidades no projeto. São elas:

1. Os clientes podem criar uma conta inserindo informações básicas de cadastro.
2. Os clientes podem editar alguns dados cadastrados.
3. Os clientes podem criar um evento de acidente, onde será possível informar o veículo envolvido no acidente e o(s) terceiro(s).
4. Os terceiros são cadastrados quando é criado um acidente, se não houver um registro prévio na base de dados.
5. Todos os usuários(clientes e terceiros) precisam ter documentos associados as suas contas.
6. Quando um houve o cadastro de um cliente que já foi envolvido como terceiro em um acidente, é preciso migrar o usuário para cliente sem perder o vínculo criado no acidente.

## 🛠 Tecnologias Utilizadas

No projeto utilizou-se:

- **Typescript** para escrita do código com tipagem estática
- **HapiJS** como biblioteca para criação da API
- **Joi** para validação dos parâmetros das requisições para a API
- **TypeORM** como conexão para criar e manipular o banco de dados por meio de queries pré processadas
- **Postgres** como banco de dados relacional
- **Jest** como ferramenta de teste
- **Docker** para prover o banco de dados em container com facilidade

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

Já para rodar os testes implementados, escreva no terminal

```
npm test
```

## 🥂 Considerações finais

Desde já gostaria de agradecer a [U4C](https://www.u4c.com.br/) pelo contato feito, pelas conversas e por ter disponibilizado o teste prático. Este último que foi bem proveitoso para relembrar alguns dos conceitos que já trabalhei e que foi fruto de aprendizado enquanto estava desenvolvendo.
