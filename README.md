# linkshortener

## Descrição do Projeto
<p>Este projeto tem como objetivo fazer o encurtamento de links enviados para a api</p>

## Instalação do projeto Local
<p>Para rodar o projeto local, é necessario ter instalado o POSTGRES</p>

<p>No arquivo de configuração do banco de dados você poderá configurar os dados do seu postgres, este arquivo está localizado em 'src/dev/database'</p>

<p>No arquivo de enviroment, localizado em 'src/dev/database' você poderá configurar a localização do servidor que você irá rodar o projeto, no caso local, trocar os ip's de host e baseURL para localhost</p>

<p>Com todos esses passos configurados, rodar os seguintes comandos:</p>

### Instalação dos pacotes
$ yarn install

### Rodar o projeto
$ yarn dev

<p>Pronto, com todos esses passos você poderá utilizar a api localmente, encontrando a documentação a mesma em localhost:4000/api-docs</p>

## Instalação do projeto em servidores via docker
<p>Existe uma imagem pronta localizada no docker hub com o nome marcelosavian/linkshortener, em que é possivel utiliza-la para testes</p>

<p>Para a configuração total do projeto, é possivel rodar os seguintes comandos:</p>

### Criação de uma network
$ docker network create --subnet 172.200.2.0/20 --gateway 172.200.2.1 linkshortener_network

### Instalação do postgres
$ docker run --name postgres -e POSTGRES_PASSWORD=root --network linkshortener_network -p 5432:5432 --ip 172.200.2.50 -d postgres

### Instalação da api
$ docker run --name linkshortener --network linkshortener_network -p 4000:4000 --ip 172.200.2.51 -d marcelosavian/linkshortener

<p>Pronto, já é possivel utilizar a api, localizada na porta 4000. Tambem é possivel acessar a documentação via localhost:4000/api-docs</p>

# Servidor atual
<p>É possivel utilizar esta api, que está localizada no link, http://54.162.8.45:4000/</p>

<p>Essa api está localizada em uma maquina virtual AWS Lightsail</p>

<p>Não será possivel acessar a documentação via esse link, pois não foi obtido o certificado SSL</p>

# Testes
<p>É possivel fazer testes rapidos, digitando o comando 'yarn test'. Esses testes estão configurados na pasta __tests__</p>

<p>Para vizualizar os resultados, irá aparecer no console, ou tambem, é possivel abrir o arquivo localizado em coverage/lcov-report/index.html, abrindo o arquivo via navegador</p>

# Documentação
<p>É possivel acessar a documentação ao rodar o projeto local, em http://localhost:4000/api-docs</p>

<p>Ou tambem, acessar a documentação criada via postman em http://54.162.8.45:4000/rTVwwZZZ</p>
