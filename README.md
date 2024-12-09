# AG Sistemas - Desafio Back-end

- Este repositório contém a aplicação back-end desenvolvida para as soluções dos exercícios 1,4 e 5 do desafio proposto.
  
---

## Tecnologias Utilizadas

- NestJS
- Prisma ORM
- PostgreSQL
- Docker
- Jest

---

## Como executar essa aplicação

1. Clone o repositório.
2. Execute o comando `npm install` para instalar as dependências.
3. Crie um arquivo `.env` na raiz do projeto informando as varáveis de ambiente comforme exemplo. As variáveis foram encaminhadas via e-mail dentro do arquivo. envs.txt.
4. Com o programa Docker executando, execute o comando `docker-compose up` para inicializar os containers do banco e da aplicação.
5. Com a aplicação Docker executando, execute em uma nova janela do terminal o comando `npx prisma migrate dev --name initial-migration` para iniciar as migrations.
6. Para testar as aplicações em um cliente Rest, utilize o arquivo `agsistemas.json` que foi disponibilizado na raíz do projeto.


### Observações

- A versão do Prisma nesta aplicação suporta apenas Node.js >= 18.18. A versão recomenda é a 20 ou mais atual.
- Essa aplicação foi desenvolvida utilizando Docker, verifique de estar executando o Docker para executar a aplicação.
- Em caso de qualquer dúvida, me envie um email através de pablolucio_@hotmail.com ou [me contate via WhatsApp](https://api.whatsapp.com/send?phone=5531985187963&text=Hello).