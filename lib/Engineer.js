// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./employee");

class Engineer {
    constructor(name, id, email, github){
    super(name, id, email);
    this.github = github;
}
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }
}
modules.exports = Engineer