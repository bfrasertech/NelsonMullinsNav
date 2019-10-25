export const trimWithEllipsis = (input: string, maxLength: number): string => {

    if (!input || input.length <= maxLength){
        return input;
    }

    return `${input.substring(0, maxLength)}...`;

}