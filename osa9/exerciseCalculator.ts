import isNotNumber from "./utils";
type RatingDesc = 'bad' | 'average' | 'good' | "N/A";
interface result {
    periodLenght: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: RatingDesc;
    target: number;
    average: number;
}
interface arguments {
    target: number;
    hours: number[];
}

export const calculateExercises = (hours: number[], target: number): result => {

    const avg = hours.reduce((acc, curr) => acc + curr)/hours.length;
    const calcRating = () => {
        if ( target == 0) {
            return 3;
        }
        const ratio = Math.round(avg / target);
        if (ratio < 1){return 1;}
        if (ratio >= 1 && ratio < 2){return 2;}
        if (ratio >= 2){return 3;}
        return 0;
    };

    const ratingGen = ():RatingDesc => {
        const rat = calcRating();
        if(rat == 1){return 'bad';}
        if(rat == 2){return 'average';}
        if(rat == 3){return 'good';}
        return "N/A";
    };

    return {
        periodLenght: hours.length,
        trainingDays: hours.filter((val: number)=>  val !== 0).length,
        success: hours.every((val:number) => val >= target),
        rating: calcRating(),
        ratingDescription: ratingGen(),
        target: target,
        average: avg
    };
};
if(require.main === module){
    const parseArguments = (args:string[]): arguments => {
        args.splice(0, 2);
        args.forEach( (val): void => {
            if(isNotNumber(Number(val))){
                throw new Error("Provided values were not numbers");
            }
        });
        if (args.length < 2){
            throw new Error("Not enough arguments");
        }
        return {
            target: Number(args[0]),
            hours: args.slice(1).map(Number)
        };

    };

    try{
    const {target, hours} = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
    } catch (error: unknown) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error){
            errorMessage += ' Error ' + error.message;
        }
        console.log(errorMessage);
    }
};

export default calculateExercises;