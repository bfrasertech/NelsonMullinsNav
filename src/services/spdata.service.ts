import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface IAlert {
    id: number;
    title: string;
    body: string;
}

const alertListId = '196BE30C-F35C-457A-8A71-F3119771B807';

export const fetchActiveAlert = (context: ApplicationCustomizerContext): Promise<IAlert> => {

    const today: Date = new Date();

    let listUrl = `${context.pageContext.site.absoluteUrl}`;
    listUrl += `/_api/web/lists('${alertListId}')/items?$top=1&$select=Id,Title,jsResourceContent&`;
    listUrl += `$filter=(jsResourceDateStart le '${today.toISOString()}') and (jsResourceDateEnd gt '${today.toISOString()}')&$orderby=jsResourceDateStart desc`;


    return new Promise<IAlert>((resolve: (activeAlert: IAlert) => void, reject: (error: any) => void): void => {

        context.spHttpClient
            .get(listUrl, SPHttpClient.configurations.v1)
            .then((clientResponse: SPHttpClientResponse): Promise<IAlert> => {
                if (clientResponse.ok) {
                    return clientResponse.json();
                } else {
                    reject(clientResponse.statusText);
                }
            })
            .then((spResponse: any): void => {
                if (spResponse && spResponse.value && spResponse.value.length > 0) {
                    resolve(mapSPResultToAlert(spResponse.value[0]));
                } else{
                    resolve(undefined);
                }
            })
            .catch((error: any): void => {
                console.log(error);
                reject(error);
            });

    });
}

const mapSPResultToAlert = (spResult: any): IAlert => ({ id: spResult.Id, title: spResult.Title, body: spResult.jsResourceContent });