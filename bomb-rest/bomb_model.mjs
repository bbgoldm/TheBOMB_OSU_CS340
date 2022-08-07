import mongoose from 'mongoose';
import 'dotenv/config';
// DOES NOT IMPORT EXPRESS
// Model works with the database via mongoose which is a document-object mapper

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// const db = mongoose.connection;


// Define the schema - here's what the collection will look like in MongoDB
// Mongoose does the translation from JavaScript
const testSchema = mongoose.Schema({
    name: { type: String, required: true},
    reps: { type: Number, minimum: 1, required: true},
    weight: { type: Number, minimum: 1, required: true},
    unit: { type: String, required: true},
    date: { type: String, required: true}
});

// Define a model with a JavaScript class.  Mongoose will allow us to call the class, constructor, etc
// Compile the model from the schema.
const Test = mongoose.model("Test", testSchema)

const userInputBadMessage = { Error: "Invalid request"}

/**
 * Name validation
 */
function isNameValid(name){
    const nameValid = name.length > 0;
    return nameValid
}


/**
* Date validation
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // Check the format
    const format = /^\d\d-\d\d-\d\d$/;
    // return format.test(date);
    if (!format.test(date)){
        return false;
    }
    const parts = date.split("-")
    const month = parseInt(parts[0], 10)
    const day = parseInt(parts[1], 10)
    const year = parseInt(parts[2], 10) + 2000
    if (year < 2000 || year > 2099 || month < 1 || month > 12){
        return false;
    }
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // adjust for leap year
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){
        monthLength[1] = 29;
    }
    // check the day range
    return day > 0 && day < monthLength[month - 1]
    
}
/**
 * Unit validation
 * @param {string} unit 
 */
function isUnitValid(unit) {
    // Test using string equals.
    const unitValid = (unit === 'kgs' || unit === 'lbs')
    return unitValid
}
/**
 * Reps validation
 */
function areRepsValid(reps){
    const repsValid = reps > 1
    return repsValid
}
/**
 * Weight validation
 */
 function isWeightValid(weight){
    const weightValid = weight > 1
    return weightValid
}
/**
 * User entered date and unit are valid
 */
function areInputsValid(name, reps, weight, unit, date) {
    return isNameValid(name) && areRepsValid(reps) && isWeightValid(weight) && isUnitValid(unit) && isDateValid(date)
}

// Create an object via the constructor
// Write the object to the database via .save
const createTest = async (name, reps, weight, unit, date) => {
    // console.log(`${reps} areRepsValid: ${areRepsValid(reps)}`)
    // console.log(`${weight} isWeightValid: ${isWeightValid(weight)}`)
    // console.log(`${unit} isUnitValid: ${isUnitValid(unit)}`)
    // console.log(`${date} isDateValid: ${isDateValid(date)}`)
    // console.log(`All inputs are valid: ${areInputsValid(reps, weight, unit, date)}`)
    if (areInputsValid(name, reps, weight, unit, date)) {
        const test = new Test({name: name, reps: reps, weight: weight, unit: unit, 
            date: date});
    
        // console.log(test)
        return test.save();
    } else {
        const inputValidationError = Error('Valid date and unit format is required.')
        // console.log(`The inputValidationError is of type: ${typeof(inputValidationError)}`)
        // console.log(`The keys of the inputValidationError are ${Object.keys(inputValidationError)}`)
        // console.log(`The keys of test are ${Object.keys(test)}`)
        throw inputValidationError
    }
    
}

/**
 * Find the test with the given ID value
 * @param {String} _id
 * @returns A promise. Either the test if there was an test with that id or null if the id wasn't found
 */
const findTestById = async (_id) => {
    const query = Test.findById(_id);
    return query.exec();
}

/**
 * Find an test based on filter/query parameters
 */
const findTests = async (filter, projection, limit) => {
    const query = Test.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();
}

/**
 * Replace the propterties of the test with the id value provided
 */
const replaceTest = async (_id, name, reps, weight, unit, date) => {
    // console.log(`${reps} areRepsValid: ${areRepsValid(reps)}`)
    // console.log(`${weight} isWeightValid: ${isWeightValid(weight)}`)
    // console.log(`${unit} isUnitValid: ${isUnitValid(unit)}`)
    // console.log(`${date} isDateValid: ${isDateValid(date)}`)
    // console.log(`All inputs are valid: ${areInputsValid(reps, weight, unit, date)}`)    
    if (areInputsValid(name, reps, weight, unit, date)) {
        const replacement_test = {name: name, reps: reps, weight: weight, unit: unit, 
            date: date};
        console.log(replacement_test)
        const result = await Test.replaceOne({_id: _id}, replacement_test);
        // const result = await Test.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
        console.log(result)
        return result.modifiedCount;
    } else {
        console.log("Inputs are not valid?")
        return -1;
    }
}

/**
 * Delete an test by id
 */
const deleteById = async (_id) => {
    const remove = await Test.deleteOne({_id: _id});
    // console.log(remove)
    return remove.deletedCount
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// To use the object we need to export it.
export {createTest, findTestById, findTests, replaceTest, deleteById};