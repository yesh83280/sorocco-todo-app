const sqlite3 = require('sqlite3');
db = new sqlite3.Database('./todoapp.db');

//Create Table 
// const createTables = async () => {
//     await db.serialize(() => {
//         db.run("DROP TABLE if exists todos");
//         db.run("CREATE TABLE todos([todoid] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,[title] NVARCHAR(1000), [isdone] BOOLEAN)");
//         db.run("INSERT INTO todos (title,isdone) VALUES  ('Task 1', True), ('Task 2', False), ('Task 3', False)");
//         db.all("SELECT todoid, title, isdone FROM todos", (error, rows) => {
//             rows.forEach((row) => {
//                 console.log(row.todoid + " " + row.title);
//             })
//         });
//     });
// }
