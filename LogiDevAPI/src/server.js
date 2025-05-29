const express = require('express')
const routes = require('./routers/routes')
const { PrismaClient } = require("@prisma/client")
const cors = require("cors");

const app = express()
const prisma = new PrismaClient()


// const corsOptions = {
// 	origin: 'http://localhost:5173', 
// 	methods: 'GET,POST,PUT,DELETE',
// 	allowedHeaders: 'Content-Type,Authorization'
//   };
  
  app.use(cors());

// Middleware para processar JSON
app.use(express.json())
app.use(routes)


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:5173/');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
});

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(8080, () => {
	console.log("Servidor rodando na porta", 8080)
})



