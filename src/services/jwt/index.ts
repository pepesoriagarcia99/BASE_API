import jwt from 'jsonwebtoken'

import configuration from '../../configuration'

export const sign = (id: string): Promise<string> => new Promise((resolve, reject) => {
    jwt.sign({ id }, configuration.jwtSecret, {}, (err, token) => {
        if (err) {
            return reject(err)
        }

        if(!token) {
            return reject('Sign error')
        }

        resolve(token)
    })
});
