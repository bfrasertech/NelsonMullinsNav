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

export const x = (): void => {}

export const fetchTeams = (context: ApplicationCustomizerContext): Promise<ITeam[]> => {

    let listUrl = `${

        context.pageContext.site.absoluteUrl
        }/_api/web/lists('${teamsList}')/items`;


    return new Promise<ITeam[]>((resolve: (teams: ITeam[]) => void, reject: (error: any) => void): void => { 

        context.spHttpClient
            .get(listUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse): Promise<ITeamItem[]> => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response);
                    // reject (response.statusText);
                }
            })
            .then((teamItems: any): void => {
                resolve(teamItems.value.map((item: ITeamItem): ITeam => mapSPResultToTeam(item)));
            })
            .catch((error: any): void => {
                console.log('Error getting teams');
                reject(error);
            });

    });
}

