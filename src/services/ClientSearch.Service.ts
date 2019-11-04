export interface IClient {
    id: string;
    name: string;
    clientNumber: string;
    clientCode: string;
}

const baseUri = 'https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/cmsclients';

const mapResultToClient = (result: any): IClient => ({ id: result.client_uno, name: result.client_name, clientNumber: result.client_uno, clientCode: result.client_code });

export const searchClients = (searchTerm: string): Promise<IClient[]> => {


    return new Promise<IClient[]>((resolve: (clients: IClient[]) => void, reject: (error: any) => void): void => {

        fetch(`${baseUri}?$top=5&$orderby=client_name&$inlinecount=allpages&$format=json&$select=Client_uno,client_name,inactive,client_code&$filter=substringof('${searchTerm}', client_name) eq true and inactive eq 'N'`,
            {
                method: 'GET', credentials: "include"
            })
            .then((response: any): Promise<any[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response);
                    reject(response.statusText);
                }
            })
            .then((clientItems: any): void => {
                resolve(clientItems.d.results.map((item: any): IClient => mapResultToClient(item)));
            })
            .catch((error: any): void => {
                console.log('Error searching clients');
                reject(error);
            });

    });
}