import {isNotNumber} from "./utils";


export const calculateBmi = (height: number, mass: number): string => {
    const bmi: number = mass / Math.pow((height / 100),2);
    let category: string = "";
    if (bmi < 16) {
        category = "Underwight (Severe thinness)";
    }
    if (bmi >= 16 && bmi < 17) {
        category = "Underwight (Moderate thinness)";
    }
    if (bmi >= 17 && bmi < 18.5) {
        category = "Underwight (Mild thinness)";
    }
    if (bmi >= 18.5 && bmi < 25) {
        category = "Normal range";
    }
    if (bmi >= 25 && bmi < 30) {
        category = "Overweight (Pre-obese)";
    }
    if (bmi >= 30 && bmi < 35) {
        category = "Obese (Class 1)";
    }
    if (bmi >= 35 && bmi < 40) {
        category = "Obese (Class 2)";
    }
    if (bmi >= 40) {
        category = "Obese (Class 3";
    }
    return category;
};

if( require.main === module){
    const parseArguments = (args: string[]): number[] => {
        if (args.length < 4) throw new Error('Not enough arguments');
        if (args.length > 4) throw new Error('Too many arguments');
    
        if (!isNotNumber(Number(args[2])) && !isNotNumber(Number(args[3]))){
            const num1 = Number(args[2]);
            const num2 = Number(args[3]);
            const numbers: number[] = [];
            numbers.push(num1);
            numbers.push(num2);
            return numbers;
        } else {
            throw new Error('Provided values were not numbers');
        }
    };
    try {
        const args: number[] = parseArguments(process.argv);
        console.log(calculateBmi(args[0], args[1]));
    } catch (error: unknown) {
        let errorMessage = 'An Error occured.';
        if(error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
};


export default calculateBmi;