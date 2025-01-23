const dataBase = require("../data/dbConnection");

// ROTTA INDEX
const index = (req, res) => {
    
    // QUERY PER INTERROGARE IL DATABASE
    const sql = "SELECT * FROM `movies`";

    // CHIAMATA AL DB
    dataBase.query(sql, (err, movies) => {
        
        // VERIFICA DI EVENTUALI ERRORI
        if (err) {
            return res.status(500).json({
                status: "Fail",
                message: "Internal error server."
            })
        }
    
        // RISPOSTA SE è TUTTO OK
        return res.status(200).json({
            status: "Success",
            data: movies
        });
    });
};


// ROTTA SHOW
const show = (req, res) => {
    // PRELEVO ID
    const id = req.params.id;
    // QUERY PER UN SOLO FILM
    const sql = "SELECT * FROM `movies` WHERE `id` = ?";

    // QUERY PER LE RECENSIONI DI UN SOLO FILM
    const sqlReviews = `
    SELECT reviews.*
    FROM reviews
    JOIN MOVIES
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    `

    // CHIAMATA AL DB
    dataBase.query(sql, [id], (err, results) => {

        // CONTROLLA EVENTUALI ERRORI DEL SERVER
        if (err) {
            return res.status(500).json({
                status: "Fail",
                message: "Internal error server"
            });
        };

        // CONTROLLA SE è STATA TROVATA LA CORRISPONDENZA
        if (results.length === 0) {
            return res.status(404).json({
                status: "Fail",
                message: "Element not found"
            });
        } 
        
        // SE C'è CORRISPONDENZA FA LA CHIAMATA AL DB PER LE RECENSIONI
        dataBase.query(sqlReviews, [id], (err, reviews) => {
            if (err) {
                return res.status(500).json({
                    status: "Fail",
                    message: "Internal error server"
                });
            } else {
                return res.status(200).json({
                    status: "Success",
                    data: {
                        ...results,
                        reviews
                    }
                });
            };
        });
    });
}

module.exports = {
    index,
    show
}