export interface IPerson {
    id: string;
    name: string;
    extension: string;
    title: string;
    department: string;
    rate: string;
    assistant: string;
    photoUrl: string;
}

const baseUri = 'https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/hcp_userdetails';
//
const mapResultToPerson = (result: any): IPerson => ({ id: result.empluno, name: result.displayname, extension: '1234', title: result.jobtitle, department: result.department, rate: '750', assistant: '', photoUrl: result.userpicl });

export const searchPeople = (searchTerm: string): Promise<IPerson[]> => {


    return new Promise<IPerson[]>((resolve: (people: IPerson[]) => void, reject: (error: any) => void): void => {

        fetch(`${baseUri}?$top=10&$orderby=displayname&$inlinecount=allpages&$format=json&$select=employeeid,empluno,displayname,userpicl,jobtitle,department&$filter=substringof('${searchTerm}', displayname)`,
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
            .then((peopleItems: any): void => {
                resolve(peopleItems.d.results.map((item: any): IPerson => mapResultToPerson(item)));
            })
            .catch((error: any): void => {
                console.log('Error in People Search');
                reject(error);
            });

    });
}