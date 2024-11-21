// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => {
    return isNaN(Number(argument));
};

export default isNotNumber;