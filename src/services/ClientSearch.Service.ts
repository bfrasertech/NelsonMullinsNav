export interface IClient {
    id: string;
    name: string;
}

const baseUri = 'https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/cmsclients';

export const searchClients = (searchTerm: string) => {
    return fetch(`${baseUri}?$inlinecount=allpages&$format=json&$select=Client_uno,client_name&$filter=Startswith(client_name,'${searchTerm}')`, 
    { 
        method: 'GET', credentials: "include" 
    }).then(response => response.json())
        .then(data => {
            return data.d.results;
        })
        .catch(e => {
            console.log(e);
        });

}