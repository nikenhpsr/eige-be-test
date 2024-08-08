## Description

This is a simple Library API built with Nest, MySQL, and being containerized with Docker.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

# if you prefer using mysql in docker
$ docker-compose up --build

# kill your docker and reset the db
$ docker-compose down -v
```