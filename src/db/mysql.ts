import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'miraback'
})

connection.connect();

process.on("exit", () => {
  console.log("Closing connection to database...");
  connection.end();
});

const queryDb = (query: string) : Promise<string[]> => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err)
        reject(err);
      resolve(result);
    });
  });
}

export default queryDb;