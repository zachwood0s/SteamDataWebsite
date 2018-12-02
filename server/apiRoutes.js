const sql = require("mssql");
const dbconfig = require('./dbconfig').dbconfig;

function runQuery(res, query){
    new sql.ConnectionPool(dbconfig).connect().then(pool => {
        return query(pool)
    }).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
        console.dir(err);
    })
}
module.exports = {
  setupRoutes(app){
    app.get('/api/users', function(req, res) {
      var resultCount = 10;
      var pageNumber = 1;
      if(req.query.pageNumber) pageNumber = req.query.pageNumber;
      if(req.query.resultCount) resultCount = req.query.resultCount;
      runQuery(res, pool => {
        return pool.request()
          .input('LookupString', sql.NVarChar, req.query.name)
          .input('ResultCount', sql.Int, resultCount)
          .input('PageNumber', sql.Int, pageNumber)
          .output('ReturnedCount', sql.Int)
          .execute("gitSteamed.SearchUser")
      });
    })
    app.get('/api/totalUsers', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetTotalUsers")
      });
    })
    app.get('/api/userReviews/', function(req, res) {
      var resultCount = 10;
      var pageNumber = 1;
      if(req.query.pageNumber) pageNumber = req.query.pageNumber;
      if(req.query.resultCount) resultCount = req.query.resultCount;
      runQuery(res, pool => {
        return pool.request()
          .input('UserName', sql.NVarChar, req.query.username)
          .input('ResultCount', sql.Int, resultCount)
          .input('PageNumber', sql.Int, pageNumber)
          .output('ReturnedCount', sql.Int)
          .execute("gitSteamed.GetUserReviews")
      })
    })
    app.get('/api/userGames/', function(req, res) {
      var resultCount = 10;
      var pageNumber = 1;
      if(req.query.pageNumber) pageNumber = req.query.pageNumber;
      if(req.query.resultCount) resultCount = req.query.resultCount;
      runQuery(res, pool => {
        return pool.request()
          .input('UserName', sql.NVarChar, req.query.username)
          .input('ResultCount', sql.Int, resultCount)
          .input('PageNumber', sql.Int, pageNumber)
          .output('ReturnedCount', sql.Int)
          .execute("gitSteamed.GetUserGames")
      })
    })
    app.get('/api/userStats/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('UserName', sql.NVarChar, req.query.username)
          .execute("gitSteamed.GetUserStats")
      })
    })
    app.get('/api/userGenres/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('UserName', sql.NVarChar, req.query.username)
          .execute("gitSteamed.GetUserGenreLayout")
      })
    })



    app.get('/api/games', function(req, res) {
      var resultCount = 10;
      var pageNumber = 1;
      if(req.query.pageNumber) pageNumber = req.query.pageNumber;
      if(req.query.resultCount) resultCount = req.query.resultCount;
      runQuery(res, pool => {
        return pool.request()
          .input('LookupString', sql.NVarChar, req.query.name)
          .input('ResultCount', sql.Int, resultCount)
          .input('PageNumber', sql.Int, pageNumber)
          .output('ReturnedCount', sql.Int)
          .execute("gitSteamed.SearchItem")
      });
    })
    app.get('/api/gameReviews/', function(req, res) {
      var resultCount = 10;
      var pageNumber = 1;
      if(req.query.pageNumber) pageNumber = req.query.pageNumber;
      if(req.query.resultCount) resultCount = req.query.resultCount;
      runQuery(res, pool => {
        return pool.request()
          .input('ItemID', sql.NVarChar, req.query.itemID)
          .input('ResultCount', sql.Int, resultCount)
          .input('PageNumber', sql.Int, pageNumber)
          .output('ReturnedCount', sql.Int)
          .execute("gitSteamed.GetGameReviews")
      })
    })
    app.get('/api/gameBundles/', function(req, res) {
      var resultCount = 10;
      var pageNumber = 1;
      if(req.query.pageNumber) pageNumber = req.query.pageNumber;
      if(req.query.resultCount) resultCount = req.query.resultCount;
      runQuery(res, pool => {
        return pool.request()
          .input('ItemID', sql.NVarChar, req.query.itemID)
          .input('ResultCount', sql.Int, resultCount)
          .input('PageNumber', sql.Int, pageNumber)
          .output('ReturnedCount', sql.Int)
          .execute("gitSteamed.GetGameBundles")
      })
    })
    app.get('/api/gameUsers/', function(req, res) {
      var resultCount = 10;
      var pageNumber = 1;
      if(req.query.pageNumber) pageNumber = req.query.pageNumber;
      if(req.query.resultCount) resultCount = req.query.resultCount;
      runQuery(res, pool => {
        return pool.request()
          .input('ItemID', sql.NVarChar, req.query.itemID)
          .input('ResultCount', sql.Int, resultCount)
          .input('PageNumber', sql.Int, pageNumber)
          .output('ReturnedCount', sql.Int)
          .execute("gitSteamed.GetGameUsers")
      })
    })
    app.get('/api/gameStats/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('ItemID', sql.NVarChar, req.query.itemID)
          .execute("gitSteamed.GetGameStats")
      })
    })
    app.get('/api/gameGenres/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('ItemID', sql.NVarChar, req.query.itemID)
          .execute("gitSteamed.GetGameGenres")
      })
    })

    app.post('/api/admin/login', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('username', sql.NVarChar, req.query.username)
          .input('password', sql.NVarChar, req.query.password)
          .output('exists', sql.Int)
          .execute("gitSteamed.Login")
      })
    })

  }
}