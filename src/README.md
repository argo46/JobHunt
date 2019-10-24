# Express Job posting app Rest API
---
## Table of Contents

- [Introduction](#introduction)
- [Prerequiste](#prerequiste)
- [Configuration](#configuration)
- [Installation](#installation)
  - [Clone](#clone)
  - [Environment](#create-environment-variable)
  - [Start](#start-development-server)
- [Dependencies](#dependencies)
- [License](#license)
---

## Introduction
---

## Prerequiste

- Node.js - Download and Install [Node.js](https://nodejs.org/en/) - Simple bash script to manage multiple active node.js versions.

- Nodemon - Download and Install [Nodemon](https://nodemon.io/) - nodemon is a tool that automatically restarting the node application when file changes in the directory are detected.
---
- Redis - Download and Install [Redis](https://redis.io/) - Redis is an in-memory data structure project implementing a distributed, in-memory key-value database with optional durability.

## Configuration

<ol>
  <li>Basic Configuration</li>
  <li>Structured</li>
  <li>Auth with JWT</li>
  <li>Redis Implementation</li>
</ol>

---

## Installation

### Clone
```bash
$ git clone https://github.com/argo46/JobHunt---Job-posting-app-Express.js-Rest-API.git
$ cd JobHunt---Job-posting-app-Express.js-Rest-API
$ npm install
```
---

### Create Environment Variable
```bash
$ cp .env.example .env
$ nano .env
```
---
```bash
PORT = YOUR-SERVER-PORT

DB_HOST = "YOU-DB-HOST"
DB_USER = "YOUR-DB-USER"
DB_PASSWORD = "YOUR-DB-PASSWORD"
DB_NAME = "YOUR-DB-NAME"

JWT_SECRET_KEY = "YOUR-JWT-SECRET-KEY"
```
---
### Start Development Server
```bash
$ npm start
```
---

## Other Dependencies

- [mysql](#)
- [bcrypt](#)
- [jsonwebtoken](#)
- [passport](#)
- [morgan](#)
- etc.

---