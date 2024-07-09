#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgMagentaBright("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
console.log(chalk.bgMagentaBright("^^^^^^^^^^^^^^^^^^ Welcome to Student Management System^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
console.log(chalk.bgMagentaBright("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"));
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // an empty array
        this.balance = 100;
    }
    // enroll course
    enroll_course(course) {
        this.courses.push(course);
    }
    // veiw student balance
    veiw_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    // pay student fees
    pay_methods(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }
    // veiw studeent status
    show_status() {
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Balance : $${this.balance}`);
        console.log(`Courses : ${this.courses}`);
    }
}
// define student class to manage students
// new student detailes
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add a new student
    add_student(name) {
        let newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(`Student ${name} added successfully . Student ID ${newStudent.id}`);
    }
    //method to enroll student in a coures
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
        else {
            console.log(`Student with ID ${student_id} not found`);
        }
    }
    //method to veiw a student balance
    veiw_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.veiw_balance();
        }
        else {
            console.log(`Student not found . Pleaae enter correct student ID.`);
        }
    }
    //method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_methods(amount);
        }
        else {
            console.log(`Student not found . Pleaae enter correct student ID.`);
        }
    }
    // method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // method to find a student by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
;
//main function to run the program
async function main() {
    let start_system = new Student_manager();
    //while loop to keep program run
    while (true) {
        // option to perform action
        let choice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "Veiw Student balance",
                    "Pay fees",
                    "Show status",
                    "Exit"
                ]
            }]);
        // using switch case for user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "Enter a student name ."
                    }]);
                start_system.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID ."
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course name ."
                    }]);
                start_system.enroll_student(course_input.student_id, course_input.course);
                break;
            case "Veiw Student balance":
                let balance_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID ."
                    }]);
                start_system.veiw_student_balance(balance_input.student_id);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID ."
                    }, {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay ."
                    }]);
                start_system.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID ."
                    }]);
                start_system.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.bgYellowBright.red.bold("Thank you"));
                process.exit();
        }
    }
}
//calling main function
main();
