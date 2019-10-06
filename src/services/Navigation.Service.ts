import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';

export interface ITeam {
    id: number;
    title: string;
}

const teamsList = '176799b5-1e0b-42bc-9e11-778f85851935';

export const fetchTeams = (context: ApplicationCustomizerContext): Promise<ITeam[]> => {
    let listUrl = `${
         
        context.pageContext.site.absoluteUrl
      }/_api/web/lists('${teamsList}')/items`;

      return context.spHttpClient
      .get(listUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => response.json())
      .then((json: any) =>
        json.value.map((item: any) => mapSPResultToTeam(item))
      )
      .catch((error: any) => {
        console.log('Error in ');
        return new Promise<ITeam[]>((resolve, reject) => {
          reject(error);
        });
      });
}

const mapSPResultToTeam = (spResult: any): ITeam => ({id: spResult.Id, title: spResult.Title});