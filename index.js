//packages needed for this application
const generateMD = require("./utils/generateMarkdown");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

//array of questions for user input
const questions = [
    "What is the title of your project?",
    "Please describe your project:",
    "What are the installation instructions for your project, if any?",
    "What usage information would you like to provide the user, if any?",
    "What are the contribution guidelines for your project, if any?",
    "What are the testing instructions for your project, if any?",
    "Please choose a license:",
    "Please enter your GitHub username:",
    "Please enter your email address:",
];

const names = [
    "title",
    "description",
    "installation",
    "usage",
    "contribution",
    "testing",
    "license",
    "github",
    "email",
];

let prompts = [];

// Builds the one prompt with multiple options
function licensePrompt() {
    let licenseOption = ["Apache","BSD","Creative Commons","GNU","MIT","Zlib","none"];
    let licensePrompt = {
        type: "list",
        message: questions[6],
        name: names[6],
        choices: licenseOption,
    }
    return licensePrompt;
}

// Builds objects for prompt functions
function populatePrompts() {
    for(let i = 0; i < questions.length; i++) {
        if(i !== 6) {
            let ques = {
                type: "input",
                message: questions[i],
                name: names[i]
            }
            prompts.push(ques);
        } else {
            prompts.push(licensePrompt());
        }    
    }
}

// Initiates prompts
function askQuestions() {
    const inquirer = require("inquirer");
    inquirer
    .prompt(prompts)
    .then((response) => {
        writeToFile(response);
    });
}

// writes README file
function writeToFile(data) {
    //CHANGE LATER
    fs.writeFile("README1.md",generateMarkdown(data), (err) =>
    err ? console.error(err) : "");
}

// function to initialize app
function init() {
    populatePrompts();
    askQuestions();
}

// Function call to initialize app
init();