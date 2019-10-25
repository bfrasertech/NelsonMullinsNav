export const trimWithEllipsis = (input: string, maxLength: number): string => {

    if (!input || input.length <= maxLength){
        return input;
    }

    return `${input.substring(0, maxLength)}...`;

}

export const navigate = (url: string): void => {
    let baseUrl: string = `${window.location.protocol}//${window.location.host}`;

    if (url.indexOf('http') === 0) {
        window.location.href = url;
    } else if (url.indexOf('/') === 0) {
        window.location.href = `${baseUrl}${url}`;
    } else {
        window.location.href = `${baseUrl}/${url}`;
    }
}