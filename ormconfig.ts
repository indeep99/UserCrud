import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    database: 'nestjs-db',
    host: 'localhost',
    port: 3306,
    entities: ['dist/src/users/entities/**/*.entity.js'],
    username: 'root',
    password: 'root',
    synchronize: true, 
    // migrations : [
    //     'dist/src/db/migrations/*.js'
    // ], 
    // cli : {
    //     migrationsDir: 'src/db/migrations'
    // }   
}

export default config;