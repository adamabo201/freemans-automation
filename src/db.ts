import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "form_selectors.sqlite",
    driver: sqlite3.Database
  });
}

export async function saveField(db: any, selector: string, property: string, value: string) {
  await db.run(
    `CREATE TABLE IF NOT EXISTS form_fields (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      selector TEXT,
      property TEXT,
      value TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );

  await db.run(
    `INSERT INTO form_fields (selector, property, value) VALUES (?, ?, ?)`,
    [selector, property, value]
  );
}
