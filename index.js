// server.js
import express from 'express';
import indexRouter from './src/api/index.router.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Montar el router principal en /api
app.use('/api', indexRouter);



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
