const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let Team = []


function managerCreator() {
    return inquirer.prompt([
    {
        type: "input",
        name: "Name",
        message: "Hello, what is your name?"
    },
    {
        type: "number",
        name: "id",
        message: "Please enter your ID number:"
    },
    {
        type: "input",
        name: "Email",
        message: "Please enter your email:"
    },
    {
        type: "number",
        name: "Office",
        message: "Please enter your office number:"
    }
])
.then(function(answers){
    const manager = new Manager(answers.Name, answers.id, answers.Email, answers.Office);
    Team.push(manager);
    startTeam();
})
};


function startTeam(){
    return inquirer.prompt([
    {
    type: "list",
    name: "New",
    message: "Do you want to add a new team member?",
    choices: ["Yes, I would like to add a new member!", "No, my team's awesome as is!"]
}
]).then(function(answers){
    if(answers.New === "Yes, I would like to add a new member!"){
        chooseRole();
    }
    else {
        let renderedHTML = render(Team)
            fs.writeFile("./Output/team.html", renderedHTML, function(){
                    console.log("Successful team creation")
                });
        
    }
})
};

function chooseRole(){
    return inquirer.prompt([
    {
    type: "list",
    name: "Title",
    message: "What is the member's job title?",
    choices: ["Engineer", "Intern", "I'm done creating my team!"]
}
])
.then(function(answers){
    if(answers.Title === "Engineer"){
        engineerCreator();
    }
    else if(answers.Title === "Intern") {
        internCreator();
    }
    else {
        render(Team);
    }
})
}; 



function engineerCreator(){
    return inquirer.prompt([
 {
    type: "input",
    name: "Name",
    message: "Enter the engineer's name:",
},
{
    type: "number",
    name: "id",
    message: "Enter the engineer's ID number:"
},
{
    type: "input",
    name: "Email",
    message: "Enter the engineer's email address:"
},
{
    type:"input",
    name: "GitHub",
    message: "Enter the engineer's GitHub username:"
}
])
.then(function(answers){
    const engineer = new Engineer(answers.Name, answers.id, answers.Email, answers.GitHub);
    Team.push(engineer);
    startTeam();
})
};



function internCreator(){
    return inquirer.prompt([
{
    type: "input",
    name: "Name",
    message: "Enter the intern's name:"
},
{
    type: "number",
    name: "id",
    message: "Enter the intern's ID:"
},
{
    type: "input",
    name: "Email",
    message: "Enter the intern's email address:"
},
{
    type: "input",
    name: "School",
    message: "Enter the intern's school:"
}
])
.then(function(answers){
    const intern = new Intern(answers.Name, answers.id, answers.Email, answers.School);
    Team.push(intern);
    startTeam();
})
};


managerCreator();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
