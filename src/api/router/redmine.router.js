// routers/redmine.router.js
import { Router } from 'express';

// Si usas Node.js 18+ puedes usar fetch sin importar nada adicional.
// De lo contrario, instala node-fetch y haz:
// import fetch from 'node-fetch';

const router = Router();

/**
 * Convierte los query params recibidos en la request
 * a un string de query para Redmine (ej: "?user_id=93&from=2024-11-01...")
 */
function buildQueryParams(params) {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * GET /api/redmine/time-entries
 * Ejemplo de uso con query params:
 * /api/redmine/time-entries?user_id=93&from=2024-11-01&to=2025-01-30&limit=150
 */
router.get('/time-entries', async (req, res) => {
  try {
    // Construimos el query string a partir de los parámetros que llegan
    const queryString = buildQueryParams(req.query);
    const url = `https://redmine.wing.cl/time_entries.json${queryString}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        // Reemplaza "TU_API_KEY_AQUI" con tu propia API Key
        'X-Redmine-API-Key': process.env.REDMINE_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error desde Redmine: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener time entries de Redmine:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * GET /api/redmine/users
 * Ejemplo de uso con query params:
 * /api/redmine/users?limit=100&status=1&name=John
 */
router.get('/users', async (req, res) => {
    console.log('hola');
    
    console.log(req.query);
    console.log(process.env.REDMINE_API_KEY);
    let url
    if (Object.keys(req.query).length > 0) {
        console.log('query');
        const queryString = buildQueryParams(req.query);
        url = `https://redmine.wing.cl/users.json${queryString}`;
    }else{
        console.log('no query');
        url = `https://redmine.wing.cl/users.json`;
    }
    try {

      // Realizamos la petición a Redmine con la cabecera de autenticación
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Redmine-API-Key': process.env.REDMINE_API_KEY,
        //   Opcionalmente puedes incluir:
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      // Si Redmine devuelve un status distinto de 2xx, lanzamos un error
      if (!response.ok) {
        throw new Error(`Error desde Redmine: ${response.status} ${response.statusText}`);
      }
  
      // Parseamos la respuesta a JSON
      const data = await response.json();
  
      // Devolvemos la data al cliente
      res.json(data);
    } catch (error) {
      console.error('Error al obtener usuarios de Redmine:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

export default router;
