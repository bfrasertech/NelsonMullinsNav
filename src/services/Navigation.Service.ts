
import * as config from 'config'; 

const managementGroupsCacheKey: string = 'nmrs-local-mgmt-grps-cache';
const teamsCacheKey: string = 'nmrs-local-teams-cache';
const officesCacheKey: string = 'nmrs-local-offices-cache';
const committeesCacheKey: string = 'nmrs-local-committees-cache';
const adminsCacheKey: string = 'nmrs-local-admins-cache';

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

const mapResultToMgmtGroup = (result: any): IManagementGroup => ({ id: result.id, name: result.mgmt_group_name });
export const fetchManagementGroups = (): Promise<IManagementGroup[]> => {

    return new Promise<IManagementGroup[]>((resolve: (offices: IManagementGroup[]) => void, reject: (error: any) => void): void => {

        const cachedManagementGroups = sessionStorage.getItem(managementGroupsCacheKey);
        if (cachedManagementGroups){
            resolve(JSON.parse(cachedManagementGroups));
        }else{

        fetch(`${config.handshakeBaseUrl}/handshakewebservices/odata/odata.ashx/nmrs_management?&$orderby=sortorder&$inlinecount=allpages&$format=json&$select=id,mgmt_group_name`,
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
            .then((mgmtItems: any): void => {
                const managementGroups: IManagementGroup[] = mgmtItems.d.results.map((item: any): IManagementGroup => mapResultToMgmtGroup(item));
                sessionStorage.setItem(managementGroupsCacheKey, JSON.stringify(managementGroups));
                resolve(managementGroups);
            })
            .catch((error: any): void => {
                console.log('Error getting management groups');
                reject(error);
            });
        }
    });
}

const mapResultToTeam = (result: any): ITeamEntry => ({ id: result.id, name: result.title });
export const fetchTeams = (): Promise<ITeamEntry[]> => {

    return new Promise<ITeamEntry[]>((resolve: (offices: ITeamEntry[]) => void, reject: (error: any) => void): void => {

        const cachedTeams = sessionStorage.getItem(teamsCacheKey);
        if (cachedTeams){
            resolve(JSON.parse(cachedTeams));
        }else{

        fetch(`${config.handshakeBaseUrl}/handshakewebservices/odata/odata.ashx/nmrs_teams?&$orderby=title&$inlinecount=allpages&$format=json&$select=id,title`,
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
            .then((teamItems: any): void => {
                const teams: ITeamEntry[] = teamItems.d.results.map((item: any): ITeamEntry => mapResultToTeam(item));
                sessionStorage.setItem(teamsCacheKey, JSON.stringify(teams));
                resolve(teams);
            })
            .catch((error: any): void => {
                console.log('Error getting teams');
                reject(error);
            });
        }
    });
}

const mapResultToCommittee = (result: any): ICommittee => ({ id: result.id, name: result.title });
export const fetchCommittees = (): Promise<ICommittee[]> => {

    return new Promise<IOffice[]>((resolve: (offices: ICommittee[]) => void, reject: (error: any) => void): void => {

        const cachedCommittees = sessionStorage.getItem(committeesCacheKey);
        if (cachedCommittees){
            resolve(JSON.parse(cachedCommittees));
        }else{
        fetch(`${config.handshakeBaseUrl}/handshakewebservices/odata/odata.ashx/nmrs_committees?&$orderby=title&$inlinecount=allpages&$format=json&$select=id,title`,            {
                method: 'GET', credentials: "include"
            })
            .then((response: any): Promise<any[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.statusText);
                }
            })
            .then((committeItems: any): void => {
                const committees: ICommittee[] = committeItems.d.results.map((item: any): ICommittee => mapResultToCommittee(item));
                sessionStorage.setItem(committeesCacheKey, JSON.stringify(committees));
                resolve(committees);
            })
            .catch((error: any): void => {
                console.log('Error getting committees');
                reject(error);
            });
        }
    });
}

const mapResultToOffice = (result: any): IOffice => ({ id: result.spid, name: result.name });
export const fetchOffices = (): Promise<IOffice[]> => {

    return new Promise<IOffice[]>((resolve: (offices: IOffice[]) => void, reject: (error: any) => void): void => {

        const cachedOffices = sessionStorage.getItem(officesCacheKey);
        if (cachedOffices){
            resolve(JSON.parse(cachedOffices));
        }else{
        fetch(`${config.handshakeBaseUrl}/handshakewebservices/odata/odata.ashx/hcp_offices?&$orderby=name&$inlinecount=allpages&$format=json&$select=spid,name`,
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
                const offices: IOffice[] = officeItems.d.results.map((item: any): IOffice => mapResultToOffice(item));
                sessionStorage.setItem(officesCacheKey, JSON.stringify(offices));
                resolve(offices);
            })
            .catch((error: any): void => {
                console.log('Error getting offices');
                reject(error);
            });
        }
    });
}

const mapResultToAdmin = (result: any): IAdministration => ({id: result.spid, name: result.title, grpid: result.spid});
export const fetchAdministration = (): Promise<IAdministration[]> => {

    return new Promise<IAdministration[]>((resolve: (offices: IAdministration[]) => void, reject: (error: any) => void): void => {

        const cachedAdmins = sessionStorage.getItem(adminsCacheKey);
        if (cachedAdmins){
            resolve(JSON.parse(cachedAdmins));
        }else{
        fetch(`${config.handshakeBaseUrl}/handshakewebservices/odata/odata.ashx/hcp_admingroups?&$orderby=title&$inlinecount=allpages&$format=json&$select=spid,title,spid`,
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
            .then((adminItems: any): void => {
                const admins: IAdministration[] = adminItems.d.results.map((item: any): IAdministration => mapResultToAdmin(item));
                sessionStorage.setItem(adminsCacheKey, JSON.stringify(admins));
                resolve(admins);
            })
            .catch((error: any): void => {
                console.log('Error getting admin groups');
                reject(error);
            });
        }
    });
}