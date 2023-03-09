import mysql from "mysql";
import { DBConfig } from "./config";

const dbConnection = mysql.createConnection(DBConfig);

export async function QuerySingle(sql: string): Promise<any> {
    return await new Promise((resolve, reject) => {
        dbConnection.query(sql, (error, results: Array<any>) => {
            if (error) {
                return reject(error);
            }
            return resolve(results[0]);
        });
    });
}

export async function QueryMulti(sql: string): Promise<Array<any>> {
    return await new Promise((resolve, reject) => {
        dbConnection.query(sql, (error, results: Array<any>) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}
