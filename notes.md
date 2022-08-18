Initalise the project

yarn init
Initalise TypeScript

npx typescript --init
Install dev dependencies

npm i typescript ts-node-dev @types/bcrypt @types/jsonwebtoken @types/cookie-parser @types/config -D
Install dependencies

npm i type-graphql apollo-server graphql@15.x reflect-metadata @typegoose/typegoose mongoose class-validator bcrypt jsonwebtoken cookie-parser nanoid@3.3.3 config dotenv
Update tsconfig to include:

{
"target": "es2018",
"module": "commonjs",
"lib": ["es2018", "esnext.asynciterable"],
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
"strictPropertyInitialization": false
}
