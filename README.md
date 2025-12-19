# 📝 Task Manager API

Uma API RESTful desenvolvida para a gestão de listas de tarefas, com foco em segurança, escalabilidade e persistência de dados. Este projeto implementa autenticação completa (via JWT) e controle de acesso personalizado para cada usuário.

## 📜 Regras de Negócio

- Cada usuário pode acessar apenas suas próprias tarefas.
- Tarefas são automaticamente removidas quando o usuário é deletado.
- Senhas nunca são armazenadas em texto puro.
- Tokens JWT possuem tempo de expiração configurável.


## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna de JavaScript para garantir performance e facilidade de manutenção:

- Runtime: Node.js - Ambiente de execução JavaScript server-side.

- Framework: Express.js - Framework web minimalista e flexível para rotas e middlewares.

- Banco de Dados: MongoDB Atlas - Banco de dados NoSQL distribuído em nuvem para alta disponibilidade.

- ODM: Mongoose - Modelagem de objetos para MongoDB, garantindo validação e integridade dos dados.

- Segurança:

  - JSON Web Token (JWT): Implementação de autenticação stateless e troca segura de informações.

  - Bcrypt: Algoritmo de hashing robusto para proteção de senhas de usuários.

- Desenvolvimento: Nodemon - Ferramenta que monitora alterações no código e reinicia o servidor automaticamente.

- Configuração: Dotenv - Gerenciamento de variáveis de ambiente para isolar chaves sensíveis do código-fonte.

## 🛡️ Funcionalidades e Segurança

Autenticação de usuário: Sistema de registro e login com geração de tokens JWT.

Proteção de Dados: As senhas são criptografadas antes de serem armazenadas no MongoDB Atlas.

Autorização de Rotas: Apenas usuários autenticados podem acessar e modificar as suas tarefas.

Controle de acesso: Um usuário não tem permissão para ver, editar ou excluir tarefas criadas por outros usuários (Status 403 Forbidden).

## 🔐 Autenticação

Todas as rotas protegidas exigem o envio do token JWT no header da requisição:

```
Authorization: Bearer <token>
```


## 📍 Endpoints Principais

### Rotas de usuário

#### Criar uma nova conta de usuário.
```
POST /user/

{
  "name": "Nome da pessoa",
  "email": "email@example.com",
  "password": "password_example123"
}
```
> O e-mail deve ser único no banco de dados.

#### Listar os dados do usuário (requer autenticação).
```
GET /user
```
- Retorna um JSON com os dados do usuário:
```
{
	"user": {
		"id": "694476fb2a...",
		"name": "Nome da pessoa",
		"email": "email@example.com",
		"created_at": "18/12/2025, 18:49:47"
	}
}
```

#### Atualizar os dados do usuário (requer autenticação).

```
PUT /user/
{
  "name": "Nome da pessoa",
  "password": "password_example123"
}
```
> É permitido alterar apenas o nome e senha, pode-se enviar apenas os atributos a serem alterados.

#### Deletar a conta do usuário (requer autenticação + senha).
```
DELETE /user/

{
  "password": "password_example123"
}
```
- Retorna o Status HTTP 204 (No content)

> OBS: Quando um usuário for deletado, todas as suas tarefas existentes serão deletadas automaticamente.

---

### Rotas de tarefas (Todas requerem autenticação no header)

#### Criar uma nova tarefa.
```
POST /task/

{
  "title": "Título de exemplo da tarefa",
  "description": "Descrição de exemplo da tarefa"
}
```

#### Listar todas as tarefas daquele usuário logado.
```
GET /task/
```
- Retorna um JSON com todas as tarefas.

#### Listar uma tarefa pelo ID (apenas se for o dono).
```
GET /task/{id}
```
- Retorna um JSON com os dados da task:
```
{
	"task": {
		"id": "694ae91893...",
		"title": "Título da tarefa",
		"description": "Descrição sobre a tarefa",
		"created_at": "18/12/2025, 19:08:21"
	}
}
```

#### Atualizar uma tarefa (apenas se for o dono).

```
PUT /task/{id}

{
  "title": "Título de exemplo da tarefa",
  "description": "Descrição de exemplo da tarefa"
}
```

#### Remover uma tarefa (apenas se for o dono).

```
DELETE /task/{id}
```
- Retorna o Status HTTP 204 (No content)

---

### Rota de autenticação

#### Gerar Token JWT.
```
POST /login

{
  "email": "email@example.com",
  "password": "password_example123"
}
```

- Retornará o Token JWT
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

## ⚙️ Como Executar o Projeto

Clone o repositório:
```
git clone https://github.com/caikecunha/task-manager-api.git
```

Instale as dependências:
```
npm install
```

## 🔑 Variáveis de Ambiente

Configure as variáveis de ambiente (.env) baseadas nas variáveis do arquivo de exemplo (.env.example) com a sua String de Conexão do MongoDB Atlas, sua Secret Key do JWT, a duração do token e a porta do servidor.

Exemplo de `.env`:

```
SECRET_TOKEN=
EXPIRE_TOKEN=
PORT=
URI_MONGO_ATLAS
```

Inicie o servidor:
```
npm start
```