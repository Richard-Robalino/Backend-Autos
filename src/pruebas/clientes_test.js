import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de usuarios virtuales y duración
export let options = {
  vus: 20,       // usuarios concurrentes
  duration: '30s' // duración total de la prueba
};

// Función principal
export default function () {
  // 1. Listar clientes
  let res = http.get('http://localhost:4000/api/clientes/');
  check(res, { 'list status 200': (r) => r.status === 200 });

  // 2. Crear cliente
  const payload = JSON.stringify({
    cedula: `123456789${Math.floor(Math.random() * 1000)}`, // valor único
    nombre: 'Juan',
    apellido: 'Pérez',
    ciudad: 'Quito',
    email: `juan${Math.floor(Math.random() * 1000)}@test.com`,
    direccion: 'Av. Siempre Viva 123',
    telefono: '0991234567',
    fecha_nacimiento: '1990-01-01'
  });

  const params = { headers: { 'Content-Type': 'application/json' } };
  let createRes = http.post('http://localhost:4000/api/clientes/', payload, params);
  check(createRes, { 'create status 201': (r) => r.status === 201 });

  sleep(1); // simula tiempo entre solicitudes
}

