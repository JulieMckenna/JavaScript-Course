//code challenge 3
/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! 
Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their fullname, mass, and height 
(Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). 
Store the BMI value to a property, and also return it from the method
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. 
Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
*/
const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bMI = this.mass / (this.height ** 2);
        return this.bMI;
    }
};
const john = {
    firstname: 'John',
    lastName: 'Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bMI = this.mass / (this.height ** 2);
        return this.bMI;
    }
};

if (mark.calcBMI() > john.calcBMI()) {
    console.log(`${mark.firstName}'s BMI (${mark.bMI}) is higher than ${john.firstname}'s (${john.bMI})`);
} else {
    console.log(`${john.firstName}'s BMI (${john.bMI}) is higher than ${mark.firstname}'s (${mark.bMI})`);
}