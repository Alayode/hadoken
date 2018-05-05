var fs = require('fs');
var program = require('commander');


program_name = 'node test_name';

function main() {
    console.log('Beginning sequence parameters......');
    program
        .usage('<test_case_path>')
        .command('test_case_path','path to the JSON file' +
        'containing the, eg. "inputs/medium.json"')
        .action(function(test_case_path){
            testCasePathValue = test_case_path;
        });
   
       program.parse(process.argv)

         runAnswer('./medium.json')

         
        let waitOne = function() {
            console.log('Done.');
        }
        setTimeout(waitOne, 3000);
  
}

function runAnswer(testCasePath) {
    var test_file = 'testing.js'
    console.log('Calling the runAnswer function')
    console.log('Run the answer from the test case path ' , testCasePath)

    // loadInputFromFile(test_file);
    var input = loadInputFromFile(testCasePath);
    // console.log('Logging file Content ', input );
    if(!inputIsValid(input)) {
        process.exit(1);
    }


    answer = require('./answer');
 =
    var output = answer.identify_spammers(input['log_path']);
    var jsonOutput = JSON.stringify(input['log_path']);

    var data = fs.readFileSync('./medium.log');
    var spammers = data.toString();
    console.log(spammers[0]);

    console.log('input[logpath]', input['log_path']);
    // The output object must always be saved to 'output.json'
    // DO NOT change the name of this file.

    var output_path = 'output.json';
    dumpOutputToFile(jsonOutput,output_path);
}


function loadInputFromFile(filename) {

    console.log('Calling loadInputFromFile ' + filename);
    try {
        var content = fs.readFileSync(filename);
        var fileContent = JSON.parse(content);
    } catch(error) {
        if (error.code == 'ENOENT') {
            console.error(' Error, could not read file ' + filename);
        } else {
            console.error(' Error, input file ' + filename + 'does no containt valid JSON');
        }
        process.exit(1);
    }
    return fileContent;
}

 function inputIsValid(input) {

   
    var requiredFields = {
        'log_path' : 'string',
    };

    var fieldsAreValid = true;
    for (var field in requiredFields) {
        if(!(field in input)) {
            console.log('Error, input JSON does not have field "%s"',field);
            fieldssAreValid = false;
        } else if (typeof input[field] != requiredFields[field]) {
            console.log('Error, input JSON does not have field "%s"',
                        field, typeof input[field], requiredFields[field]);

        }  else if (typeof input[field] == 'object'
                    && !Array.isArray(input[field])) {
            console.log('Error, field "%s" in  input file should be an array',
                        field);

        }
    }
      return fieldsAreValid;
}
/**
 * @param {array of strings} output  - the output to be JSON encoded and
 *              dumped to file
 * 
 * @param {string} filePath string with path of the file to create, eg. 'output.json'
 */


function dumpOutputToFile(output, filePath) {
    fs.writeFileSync(filePath, output);
}

main();


