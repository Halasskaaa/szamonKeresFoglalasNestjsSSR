import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Foglalas } from './foglalas.js';
import { NewFoglalas } from './folalas.dto.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db',
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getFoglalasok() {
    const [results] = await mysqlConnection.execute(
      'SELECT * FROM `reservations`;'
    )
    const rows = results as Foglalas[];
    return rows;
  }

  async addFoglalasok(name: string,email: string,startDate: Date,guests: number) {
    const [results] = await mysqlConnection.execute(
      'INSERT INTO reservations (name, email, startDate, guests) VALUES (?,?,?,?)',
      [name, email, startDate, guests]
    )
    const rows = results as any;
    return {
      id: rows.insertId,
      name, 
      email, 
      startDate, 
      guests
    } as NewFoglalas;
  }
}
