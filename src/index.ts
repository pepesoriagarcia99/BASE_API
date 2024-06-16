import http from 'http'
import os from 'os'

import configuration from './configuration'
import express from './services/express'
import api from './api'

import UserRepository from './api/user/repository'
import User, { Role } from './api/user/model'
import { userCreate } from './api/user/service'

const { ip, port, apiRoot, env } = configuration

const app = express(apiRoot, api);
const server = http.createServer(app);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env);
    console.log('HOST: ' + getIPv4());

    createAdmin();
  })
})

/**
 * Lee la direccion IP de la maquina
 * @returns IP de la maquina
 */
function getIPv4(): String | null {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    if (interfaces) {
      for (const interfaceInfo of interfaces) {
        const { address, family, internal } = interfaceInfo;
        if (family === 'IPv4' && !internal && address.endsWith('.1') === false) {
          return address;
        }
      }
    }
  }

  return 'Error de deteccion';
}

/**
 * Create admin user
 */
function createAdmin() {
  userCreate({
    name: 'admin',
    password: 'admin',
    role: Role.admin
  })
      .then(() => {
      console.log('Admin user created');
    })
    .catch((error: Error) => {
      console.error('Error creating admin user', error);
    });
}
