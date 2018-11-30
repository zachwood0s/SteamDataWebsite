const sql = require("mssql");
const dbConfig = {
    user:  "",
    password: "",
    server: "",
    database: ""
}
module.exports = {
  setupRoutes(app){
    app.get('/api/users', function(req, res) {
      sql.connect(dbConfig).then(pool => {
          return pool.request()
          .input('value', sql.Int, 100)
          .query("select * from gitSteamed.Reviews where Helpful > @value")
      }).then(result => {
          res.send(result);
          console.dir(result);
      }).catch(err => {
          console.dir(err);
      })
    })
  }
}