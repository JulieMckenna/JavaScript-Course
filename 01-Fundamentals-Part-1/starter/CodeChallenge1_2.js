//Coding challenge 1
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula(you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall. `true`
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall. `false`
*/

const markWeight = 95;
const markHeight = 1.88;
const markBMI = (markWeight / (markHeight ** 2));

const johnWieght = 85;
const johnHieght = 1.76;
const johnBMI = (johnWieght / (johnHieght * johnHieght));

let markHigherBMI = markBMI > johnBMI;
console.log(markBMI, johnBMI, markHigherBMI);

//Coding challange 2
/*
1. Print a nice output to the console, saying who has the higher BMI.
The message is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs.
Example:"Mark's BMI (28.3) is higher than John's (23.9)!"
*/
if (markHigherBMI) {
    console.log("Mark's BMI is higher than John's");
    console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})`)
} else {
    console.log("John's BMI is higher than Mark's");
    console.log(`John's BMI (${johnBMI}) is higher than Mark's (${markBMI})`)
}

