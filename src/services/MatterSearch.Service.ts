export interface IMatter {
    id: string;
    name: string;
}

const baseUri = 'https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/cmsmatters';

export const searchClients = (searchTerm: string) => {
    return fetch(`${baseUri}?$inlinecount=allpages&$format=json&$select=matter_uno,long_matt_name&$filter=Startswith(long_matt_name,'${searchTerm}')`, 
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