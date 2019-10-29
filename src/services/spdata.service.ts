import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface IAlert {
    id: number;
    title: string;
    body: string;
}

export interface IIntranetSearchResult{
    id: number;
    title: string;
    url: string;
    description: string;
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

export const searchSite = (context: ApplicationCustomizerContext, searchTerm: string): Promise<IIntranetSearchResult[]> => {

    const today: Date = new Date();

    let searchUrl = `${context.pageContext.site.absoluteUrl}`;
    searchUrl += `/_api/search/query?querytext='${searchTerm} (contentclass:STS_ListItem)'&rowLimit=5&selectproperties='Id,Title,Path,Description'`;

    return new Promise<IIntranetSearchResult[]>((resolve: (activeAlert: IIntranetSearchResult[]) => void, reject: (error: any) => void): void => {

        const headers: Headers = new Headers(); 
        headers.append('Accept', 'application/json; odata=verbose');
        
        //{ "Accept": "application/json; odata=verbose" }

        // const ops: ISPHttpClientOptions = {
        //     headers: {'Accept': 'application/json;odata.metadata=minimal'}
        // }

        context.spHttpClient
            .get(searchUrl, SPHttpClient.configurations.v1)
            .then((clientResponse: SPHttpClientResponse): Promise<IIntranetSearchResult[]> => {
                if (clientResponse.ok) {
                    return clientResponse.json();
                } else {
                    reject(clientResponse.statusText);
                }
            })
            .then((spResponse: any): void => {
                if (spResponse 
                    && spResponse.PrimaryQueryResult 
                    && spResponse.PrimaryQueryResult.RelevantResults 
                    && spResponse.PrimaryQueryResult.RelevantResults.Table 
                    && spResponse.PrimaryQueryResult.RelevantResults.Table.Rows 
                    && spResponse.PrimaryQueryResult.RelevantResults.Table.Rows.length > 0) {
                    resolve(spResponse.PrimaryQueryResult.RelevantResults.Table.Rows.map((item: any): IIntranetSearchResult => mapSPResultToIntranetSearchResult(item)));
                } else{
                    resolve([]);
                }
            })
            .catch((error: any): void => {
                console.log(error);
                reject(error);
            });

    });
}

const mapSPResultToAlert = (spResult: any): IAlert => ({ id: spResult.Id, title: spResult.Title, body: spResult.jsResourceContent });
const mapSPResultToIntranetSearchResult = (spResult: any): IIntranetSearchResult => {

    let result: IIntranetSearchResult = { id: 0, title: '', url: '', description: ''};
    
    spResult.Cells.forEach(cell => {
        if (cell.Key === 'Title'){
            result.title = cell.Value;
        }

        if (cell.Key === 'Id'){
            result.id = cell.Value;
        }

        if (cell.Key === 'Path'){
            result.url = cell.Value;
        }

        if (cell.Key === 'Description'){
            result.description = cell.Value;
        }
    });

    return result;
};