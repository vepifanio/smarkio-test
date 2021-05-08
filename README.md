## Teste Técnico - Seletivo Smarkio

Dentro da pasta raiz execute:

Caso utilize o yarn

```yarn```

Caso utilize npm

```npm i```

Substitua as seguintes informações com as informações do seu banco de dados dentro de src/config/database.js:
```json
username: "{username}",
password: "{password}",
database: "{database}",
host: "{host}",
dialect: "mysql"
```

Execute o comando:

```yarn sequelize-cli db:migrate```

ou

```npx sequelize-cli db:migrate```

Na pasta raiz, crie um arquivo .env e coloque as informações da apikey e serviceUrl do IBM Cloud do serviço Text to Speech da seguinte forma:
```
API_KEY=sua_api_key
SERVICE_URL=seu_service_url
```

Para rodar a aplicação, execute:

```yarn dev```

ou 

```npm run dev```

Então acesse:

http://localhost:3333
