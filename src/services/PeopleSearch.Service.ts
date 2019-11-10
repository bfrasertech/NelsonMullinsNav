export interface IPerson {
    id: string;
    name: string;
    extension: string;
    title: string;
    department: string;
    rate: string;
    photoUrl: string;
    networkid: string;
    assistantName: string;
    assistantExtension: string;
    floorPlanUrl: string;
    phoneNumber: string;
}

const baseUri = 'https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/hcp_userdetails';
//
const mapResultToPerson = (result: any): IPerson => ({ 
    id: result.empluno,
     name: result.displayname, 
     extension: result.extension, 
     title: result.jobtitle, 
     department: result.department, 
     rate: '750', 
     assistantName: undefined, 
     assistantExtension: result.secretary,
     photoUrl: result.userpicl, 
     networkid: result.networkid,
     floorPlanUrl: `/PublishingImages/FloorMaps/${result.office}${result.office_room_number}.jpg`,
     phoneNumber: result.phonenumber
    });

export const searchPeople = (searchTerm: string): Promise<IPerson[]> => {


    return new Promise<IPerson[]>((resolve: (people: IPerson[]) => void, reject: (error: any) => void): void => {

        fetch(`${baseUri}?$top=8&$orderby=displayname&$inlinecount=allpages&$format=json&$filter=substringof('${searchTerm}', displayname)`,
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