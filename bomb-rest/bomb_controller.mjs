// import 'dotenv/config';
import express from 'express';
import * as db from './db-connector';
import cors from 'cors';
// import asyncHandler from 'express-async-handler';
// import * as tests from './bomb_model.mjs';

/* Example queries from Activity 2
    query1 = 'DROP TABLE IF EXISTS diagnostic;';
    query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
    query4 = 'SELECT * FROM diagnostic;';
*/

// const express = require('express');
const app = express();
// const PORT = process.env.PORT;
const PORT = 59022;
// const db = require('./db-connector')

// capitalize changes the first letter of a string to upper case.
function capitalize(aString){
    const str0 = aString[0].toUpperCase();
    const str1 = aString.slice(1);
    return str0 + str1;
};
// tableToPK uses the table name to derive the name of the primary key attribute.
function tableToPK(aString){
    const len = aString.length
    const str0 = aString[0].toLowerCase();
    const str1 = aString.slice(1, len - 1);
    return str0 + str1 + "ID";
};
// attributesFromBody returns a list of the key values in string form
function attributesFromBody(requestBody){
    let attributes = "";
    for (const key in requestBody) {
        attributes += key + ", "    
        };
    const len = attributes.length;
    attributes = attributes.slice(0, len - 2);
    return attributes;
};
// returns a list of values for insert statement TODO: Add/remove "" based on data type.
function valuesFromBody(requestBody){
    let values = '"';
    for (const key in requestBody) {
        values += requestBody[key] + '", "';
        };
    const len = values.length;
    values = values.slice(0, len - 3);
    return values;
}
// returns a list of attribute = value for each attribute/value pair for UPDATE
function attributesEqualValues(requestBody){
    let result = ""
    for (const key in requestBody) {
        result += key + ' = "' + requestBody[key] + '", '
    }
    const len = result.length;
    result = result.slice(0, len - 2);
    return result;
}

app.use(
    cors({
        origin: "https://master--steady-llama-819e23.netlify.app/",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
)

app.use(express.json())
// Verify server is running
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/', (req, res) => {

    res.send("Hello World!");

});

/*cccccccccccccc C R E A T E ccccccccccccccc */
app.post('/:table', (req, res) => {
    const tableName = capitalize(req.params.table);
    const body = req.body;
    console.log(`Body is keys: ${Object.keys(body)} and values ${Object.values(body)}`);
    if (tableName == 'Tasks'){
        let transaction = "";
        transaction += "START TRANSACTION; "
        transaction += "SELECT COUNT(*) FROM `Tasks` INTO @startTaskCount; "
        transaction += "INSERT INTO `Tasks` (`taskVolume`) VALUES (" + body.newTask.taskVolume + "); "
        transaction += "SELECT MAX(`Tasks`.`taskID`) INTO @newTask FROM `Tasks`; "
        transaction += "INSERT INTO `Lineups` (`taskID`, `tankID`) VALUES (@newTask, " + body.newDestination.destinationTankID + "); "
        const sourceTankIDArray = String(body.newSources.sourceTankIDs).split(",");
        console.log(sourceTankIDArray)
        for (let i = 0; i < sourceTankIDArray.length; i ++){
            transaction += "INSERT INTO `Lineups` (`taskID`, `tankID`) VALUES (@newTask, " + sourceTankIDArray[i] + "); "
        }
        transaction += "SELECT COUNT(*) FROM `Tasks` INTO @endTaskCount; "
        transaction += "COMMIT; "
        transaction += "SELECT (@endTaskCount > @startTaskCount) AS status; "

        // "CALL newTask(" + body.taskVolume + ", " + body.destinationTankID + ", " + body.sourceTankIDs + ");"
        console.log(`transaction = ${transaction}`);
        db.pool.query(transaction, function(err, result, fields){
            // res.send(JSON.stringify(result))
            if (result[2].affectedRows >= 1){
                res.status(201).send(JSON.stringify(result));
            } else {
                res.status(404).send(err);
            }
        });
    } else {
    const columnNamesForSQL = attributesFromBody(body)
    const valuesForSQL = valuesFromBody(body);
    const insertQuery = "INSERT INTO " + tableName +
                        " (" + columnNamesForSQL + ") VALUES (" +
                        valuesForSQL + ");"
    console.log(`${insertQuery}`);
    db.pool.query(insertQuery, function(err, result, fields){
        if (result.affectedRows === 1){
            res.status(201).send(JSON.stringify(result));
        } else {
            res.status(404).send(err);
        }
        console.log(`The results are ${result}`);
        console.log(`The result keys are ${Object.keys(result)}`)
        console.log(`The affectedRows are ${result.affectedRows}`)
    });
    }
    
});

/*rrrrrrrrrrrrrrrrr R E A D rrrrrrrrrrrrrrrr */
// Turn off favicon fetch.  https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
app.get('/favicon.ico', (req, res) => res.status(204));

// Table select statements
app.get('/:table', (req, res) => {
    // Check if the get is for a table, if so then build the select query.
    console.log(`The :table is ${req.params.table}`);
    const tableName = capitalize(req.params.table);
    console.log(`The table name is ${tableName}`);
    let selectQuery = '';
    // let selectQuery = 'SELECT * FROM ' + tableName + ";"
    if (tableName == "Lineups" || tableName == "Materials" || tableName == "Specifications" || tableName == "Tanks" || tableName == "TankTypes" || tableName == "Tasks" || tableName == "Tests"){
        console.log("A table was selected");
    // if (tableName === "Lineups" ||  "Materials" || "Specifications" || "Tanks" || "TankTypes" || "Tasks" || "Tests"){
        console.log(`'SELECT * FROM ' + ${tableName} + ';'`);
        selectQuery = 'SELECT * FROM ' + tableName + ';';
        console.log(`The select query is ${selectQuery}`);
        db.pool.query(selectQuery, function(err, results, fields){
            res.send(JSON.stringify(results));
            });
    } else {
        console.log("A query was selected");
        console.log(`'CALL ' + ${req.params.table} + ';'`);
        selectQuery = 'CALL ' + req.params.table + ';';
        console.log(`The select query is ${selectQuery}`);
        db.pool.query(selectQuery, function(err, results, fields){
            res.send(JSON.stringify(results[0]));
            });
    }
    // console.log(`${selectQuery}`);
    // db.pool.query(selectQuery, function(err, results, fields){
    //     res.send(JSON.stringify(results));
    // });
});

// Select individual records
app.get('/:table/:id', (req, res) => {
    const tableName = capitalize(req.params.table);
    const primaryKeyName = tableToPK(tableName);
    const id = req.params.id
    console.log(tableName);
    console.log(primaryKeyName);
    console.log(id);
    console.log('Just before the second selectQuery.')
    const selectQuery = "SELECT * FROM " + tableName + " WHERE " 
                        + primaryKeyName + " = " + id + ";"
    console.log(`${selectQuery}`);
    db.pool.query(selectQuery, function(err, results, fields){
        res.send(JSON.stringify(results));
    });
});

/*uuuuuuuuuuuuu U P D A T E uuuuuuuuuuuuu*/
app.put('/:table/:id', (req, res) => {
    const tableName = capitalize(req.params.table);
    const primaryKeyName = tableToPK(tableName);
    const id = req.params.id;
    const body = req.body;
    const columnsEqualValuesForSQL = attributesEqualValues(body)
    const updateQuery = "UPDATE " + tableName + 
                        " SET " + columnsEqualValuesForSQL + 
                        " WHERE " + primaryKeyName + " = " + id + ";"
    console.log(`${updateQuery}`);
    db.pool.query(updateQuery, function(err, result, fields){
        if (result.affectedRows === 1){
            res.status(200).send(JSON.stringify(result));
        } else {
            res.status(400).send(err);
        }
        console.log(`The results are ${result}`);
        console.log(`The result keys are ${Object.keys(result)}`)
        console.log(`The affectedRows are ${result.affectedRows}`)
    });
});


/*ddddddddddd D E L E T E ddddddddddd*/
app.delete('/:table/:id', (req, res) => {
    const tableName = capitalize(req.params.table);
    const primaryKeyName = tableToPK(tableName);
    const id = req.params.id
    const deleteQuery = "DELETE FROM " + tableName + " WHERE " 
                        + primaryKeyName + " = " + id + ";"
    console.log(`${deleteQuery}`);
    db.pool.query(deleteQuery, function(err, result){
        if (result.affectedRows === 1) {
            // res.send(JSON.stringify(result)).status(204);
            // res.send(result).status(204);
            // res.send(JSON.stringify(result))
            // res.status(204).send(result) // Failed to load response data: No data found with identifier
            res.status(204).send(JSON.stringify(result))
            // res.status(204).send(result.json()) // 500 error
        } else {
            res.status(404).send(err);
        }
        // .then(affectedRows => {
        //     if (affectedRows === 1){
        //         res.status(204).send();
        //     } else {
        //         res.status(404).json({ Error: 'Not Deleted' })
        //     }
        // })
        console.log(`The results are ${result}`);
        console.log(`The result keys are ${Object.keys(result)}`)
        console.log(`The affectedRows are ${result.affectedRows}`)
        // console.log(`The fields are ${fields}`);
        
        // res.send([JSON.stringify(result), JSON.stringify(fields)]);
        // res.send(JSON.stringify(result));
        
    });
    console.log('Just after the deleteQuery.')


});
