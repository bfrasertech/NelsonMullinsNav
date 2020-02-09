import * as config from 'config';

export interface IPerson {
    id: string;
    name: string;
    extension: string;
    title: string;
    department: string;
    rate: number;
    photoUrl: string;
    networkid: string;
    assistantName: string;
    assistantExtension: string;
    floorPlanUrl: string;
    phoneNumber: string;
}

const baseUri = `${config.handshakeBaseUrl}/handshakewebservices/odata/odata.ashx/hcp_userdetails`;
//
const mapResultToPerson = (result: any): IPerson => ({ 
    id: result.empluno,
     name: result.displayname, 
     extension: result.extension, 
     title: result.jobtitle, 
     department: result.department, 
     rate: result.goal_rate, 
     assistantName: result.assistantname, 
     assistantExtension: result.assistantphone,
     photoUrl: result.userpicl, 
     networkid: result.networkid,
     floorPlanUrl: `/PublishingImages/FloorMaps/${result.office}${result.office_room_number}.jpg`,
     phoneNumber: result.phonenumber
    });

export const searchPeople = (searchTerm: string): Promise<IPerson[]> => {


    return new Promise<IPerson[]>((resolve: (people: IPerson[]) => void, reject: (error: any) => void): void => {

        fetch(`${baseUri}?$top=8&$orderby=displayname&$inlinecount=allpages&$format=json&$filter=((substringof('${searchTerm}', displayname) or substringof('${searchTerm}', firstname) or substringof('${searchTerm}', lastname)) and (isactive eq 1))`,
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