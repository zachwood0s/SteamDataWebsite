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


    //Game Routes
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

    //Bundle Routes
    app.get('/api/bundles', function(req, res) {
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
          .execute("gitSteamed.SearchBundle")
      });
    })
    app.get('/api/bundleGames/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('BundleID', sql.NVarChar, req.query.bundleID)
          .execute("gitSteamed.GetBundleGames")
      })
    })
    app.get('/api/bundleStats/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('BundleID', sql.NVarChar, req.query.bundleID)
          .execute("gitSteamed.GetBundleStats")
      })
    })
    app.get('/api/bundleGenres/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('BundleID', sql.NVarChar, req.query.bundleID)
          .execute("gitSteamed.GetBundleGenreLayout")
      })
    })

    //Admin Routes
    app.get('/api/admin/login', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('username', sql.NVarChar, req.query.username)
          .input('password', sql.NVarChar, req.query.password)
          .output('exists', sql.Int)
          .execute("gitSteamed.Login")
      })
    })
    app.post('/api/admin/add/user', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('username', sql.NVarChar, req.query.username)
          .output('added', sql.Int)
          .execute("gitSteamed.AddUser")
      })
    })
    app.post('/api/admin/add/item', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('price', sql.Float, parseFloat(req.query.price))
          .input('name', sql.NVarChar, req.query.name)
          .input('url', sql.NVarChar, "")
          .output('added', sql.Int)
          .execute("gitSteamed.AddItem")
      })
    })
    app.post('/api/admin/update/bundle', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('BundleID', sql.Int, req.query.bundleId)
          .input('DiscountedPrice', sql.Float, parseFloat(req.query.discountedPrice))
          .execute("gitSteamed.UpdateBundlePrice")
      })
    })
    app.post('/api/admin/archive/reviews', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('ReviewID', sql.Int, req.query.reviewId)
          .output('archived', sql.Int)
          .execute("gitSteamed.ArchiveReview")
      })
    })
    app.post('/api/admin/add/genre', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .input('GenreName', sql.NVarChar, req.query.genreName)
          .input('ItemID', sql.Int, req.query.itemId)
          .execute("gitSteamed.AddGenreToItem")
      })
    })

    // Review Routes
    app.get('/api/reviews', function(req, res) {
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
         .execute("gitSteamed.SearchReview")
     })
   })

    // Top 10
    app.get('/api/top10/users/playtime/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetTop10UsersPlaytime")
      })
    })
    app.get('/api/top10/items/playtime/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetTop10ItemsPlaytime")
      })
    })
    app.get('/api/top10/items/reviews/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetTop10ItemsReviews")
      })
    })
    app.get('/api/top10/items/owners/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetTop10ItemsOwners")
      })
    })
    app.get('/api/top10/items/users/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetTop10ItemsUsers")
      })
    })
    app.get('/api/top10/items/recommended/', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetTop10RecommendedGames")
      })
    })
    app.get('/api/genreTotals', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetGenreTotals")
      })
    })
    app.get('/api/funniestReview', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetFunniestReview")
      })
    })
    app.get('/api/helpfulReview', function(req, res) {
      runQuery(res, pool => {
        return pool.request()
          .execute("gitSteamed.GetMostHelpfulReview")
      })
    })
  }
}
