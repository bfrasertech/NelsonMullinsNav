import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface ITeam {
    id: number;
    title: string;
}

export interface ITeamItem{
    Id: number;
    Title: string;
}

const teamsList = '176799b5-1e0b-42bc-9e11-778f85851935';
const mapSPResultToTeam = (spResult: ITeamItem): ITeam => ({ id: spResult.Id, title: spResult.Title });

export interface IOffice {
    id: string;
    name: string;
}

export interface IManagementGroup {
    id: string;
    name: string;
}

export interface ITeamEntry {
    id: string;
    name: string;
}

export interface ICommittee{
    id: string;
    name: string;
}

export interface IAdministration{
    id: string;
    name: string;
    grpid: string;
}

export const fetchManagementGroups = (): Promise<IManagementGroup[]> => {

    return new Promise<IManagementGroup[]>((resolve: (offices: IManagementGroup[]) => void, reject: (error: any) => void): void => {

        resolve([{
            "id": '1',
            "name": "Corporate",
        },
        {
            "id": '2',
            "name": "Litigation"
        },
        {
            "id": "3",
            "name": "Government Relations"
        },
        {
            "id": "4",
            "name": "Intellectual Property"
        }]);
    });
}

const mapResultToTeam = (result: any): ITeamEntry => ({ id: result.id, name: result.title });
export const fetchTeams = (): Promise<ITeamEntry[]> => {

    return new Promise<ITeamEntry[]>((resolve: (offices: ITeamEntry[]) => void, reject: (error: any) => void): void => {

        fetch(`https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/nmrs_teams?&$orderby=title&$inlinecount=allpages&$format=json&$select=id,title`,
            {
                method: 'GET', credentials: "include"
            })
            .then((response: any): Promise<any[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then((officeItems: any): void => {
                resolve(officeItems.d.results.map((item: any): ITeamEntry => mapResultToTeam(item)));
            })
            .catch((error: any): void => {
                console.log('Error getting offices');
                reject(error);
            });
    });
}

const mapResultToCommittee = (result: any): IOffice => ({ id: result.id, name: result.title });
export const fetchCommittees = (): Promise<ICommittee[]> => {

    return new Promise<IOffice[]>((resolve: (offices: ICommittee[]) => void, reject: (error: any) => void): void => {

        fetch(`https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/nmrs_committees?&$orderby=title&$inlinecount=allpages&$format=json&$select=id,title`,            {
                method: 'GET', credentials: "include"
            })
            .then((response: any): Promise<any[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then((officeItems: any): void => {
                resolve(officeItems.d.results.map((item: any): ICommittee => mapResultToCommittee(item)));
            })
            .catch((error: any): void => {
                console.log('Error getting committees');
                reject(error);
            });
    });
}

const mapResultToOffice = (result: any): IOffice => ({ id: result.spid, name: result.name });
export const fetchOffices = (): Promise<IOffice[]> => {

    return new Promise<IOffice[]>((resolve: (offices: IOffice[]) => void, reject: (error: any) => void): void => {

        fetch(`https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/hcp_offices?&$orderby=name&$inlinecount=allpages&$format=json&$select=spid,name`,
            {
                method: 'GET', credentials: "include"
            })
            .then((response: any): Promise<any[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then((officeItems: any): void => {
                resolve(officeItems.d.results.map((item: any): IOffice => mapResultToOffice(item)));
            })
            .catch((error: any): void => {
                console.log('Error getting offices');
                reject(error);
            });
    });
}

const mapResultToAdmin = (result: any): IAdministration => ({id: result.spid, name: result.title, grpid: result.spid});
export const fetchAdministration = (): Promise<IAdministration[]> => {

    return new Promise<IAdministration[]>((resolve: (offices: IAdministration[]) => void, reject: (error: any) => void): void => {

        fetch(`https://hs-dev.nmrs.com/handshakewebservices/odata/odata.ashx/hcp_admingroups?&$orderby=title&$inlinecount=allpages&$format=json&$select=spid,title,spid`,
            {
                method: 'GET', credentials: "include"
            })
            .then((response: any): Promise<any[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then((officeItems: any): void => {
                resolve(officeItems.d.results.map((item: any): IOffice => mapResultToAdmin(item)));
            })
            .catch((error: any): void => {
                console.log('Error getting admin groups');
                reject(error);
            });
    });
}