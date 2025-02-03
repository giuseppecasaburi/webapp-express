const dataBase = require("../data/dbConnection");

// ROTTA INDEX
const index = (req, res, next) => {
    const filters = req.query

    // QUERY PER INTERROGARE IL DATABASE
    let sql = "SELECT * FROM `movies`";
    const params = [];
    const conditions = [];

    if(filters.search) {
        // AGGIUNGO ALLA REQUEST IL FILTRO
        conditions.push("title LIKE ?");
        params.push(`${filters.search}`)
    };

    for (const key in req.query) {
        if (key !== "search") {
            conditions.push(`${key} = =`);
            params.push(req.query[key]);
        }
    };

    if (conditions.length > 0) {
        sql += `WHERE ${conditions.join(" AND ")}`
    };

    // CHIAMATA AL DB
    dataBase.query(sql, params, (err, movies) => {
        
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

    // PRELEVO SLUG
    const slug = req.params.slug

    // QUERY PER UN SOLO FILM
    const sql = "SELECT * FROM `movies` WHERE `slug` = ?";

    // QUERY PER LE RECENSIONI DI UN SOLO FILM
    const sqlReviews = `
    SELECT reviews.*
    FROM reviews
    JOIN MOVIES
    ON movies.id = reviews.movie_id
    WHERE movies.slug = ?
    `

    // CHIAMATA AL DB
    dataBase.query(sql, [slug], (err, results) => {

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
        dataBase.query(sqlReviews, [slug], (err, reviews) => {
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

const storeReview = (req, res, next) => {
    // PRELEVO ID
    const movieId = req.params.id;

    // PRELEVO IL BODY
    const {name, vote, text} = req.body;

    // VALIDAZIONE
    if(isNaN(vote) || vote < 0 || vote > 5) {
        return res.status(400).json({
            status: "Fail",
            message: "Il voto deve essere un valore numerico compreso tra 0 e 5"
        });
    };

    if(name.length < 3) {
        return res.status(400).json({
            status: "Fail",
            message: "Il nome deve avere più di 3 caratteri"
        });
    };

    if(text && text.length > 0 && text.length < 5) {
        return res.status(400).json({
            status: "Fail",
            message: "Il testo deve avere almeno 6 caratteri"
        })
    }

    // QUERY E CHIAMATA PER VERIFICARE L'ESISTENZA DEL FILM
    const movieSql = `
    SELECT *
    FROM movies
    WHERE id = ?
    `

    dataBase.query(movieSql, [movieId], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: "Fail",
                message: "Internal error server."
            })
        }

        if (results.length == 0) {
            return res.status(404).json({
                status: "Fail",
                message: "Movie not found"
            })
        }
    })

    // QUERY E CHIAMATA PER AGGIUNGERE UNA NUOVA REVIEW
    const sql = `
    INSERT INTO reviews(movie_id, name, vote, text)
    VALUES (?, ?, ?, ?)
    `

    dataBase.query(sql, [movieId, name, vote, text], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: "Fail",
                message: "Internal error server."
            })
        }

        res.status(201).json({
            status: "Success",
            message: "Recensione aggiunta con successo"
        })
    })
}

module.exports = {
    index,
    show,
    storeReview
}