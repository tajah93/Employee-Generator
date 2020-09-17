// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getofficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return "Manager";
    }
}
modules.exports = Manager 