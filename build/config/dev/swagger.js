"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    swagger: '2.0',
    info: {
        version: '1.0.0',
    },
    host: 'localhost:4000',
    schemes: ['http'],
    produces: ['application/json'],
    paths: {
        '/encurtador': {
            post: {
                tags: ['Search Text'],
                summary: 'Cria uma URL encurtada!',
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '404': {
                        description: 'URL Inexistente',
                    },
                    '405': {
                        description: 'URL Invalida',
                    },
                },
                content: {
                    'application/json': {},
                },
                parameters: [
                    {
                        name: 'url',
                        in: 'body',
                        description: 'URL a ser encurtada',
                        required: true,
                        type: 'string',
                    },
                ],
            },
        },
        '/:id': {
            get: {
                tags: ['Search Text'],
                summary: 'Redireciona para a url cadastrada!',
                responses: {
                    '200': {
                        description: 'OK',
                    },
                    '404': {
                        description: 'URL Inexistente',
                    },
                    '405': {
                        description: 'URL Invalida',
                    },
                },
                content: {
                    'application/json': {},
                },
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'ID cadastrado de outra URL',
                        required: true,
                        type: 'string',
                    },
                ],
            },
        },
    },
};
