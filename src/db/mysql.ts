import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  insecureAuth: true,
  database: 'miraback'
})

connection.connect();

process.on("SIGTERM", () => {
  console.log("Closing connection to database...");
  connection.end();
});

const queryDb = (query: string, params: Object) : Promise<string[]> => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, result) => {
      if (err)
        reject(err);
      resolve(result);
    });
  });
}

export default queryDb;