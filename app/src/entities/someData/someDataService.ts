import axios, { AxiosResponse } from 'axios';
import servers from './dummyData//servers.json';
import cubes from './dummyData/cubes.json';
import views from './dummyData/views.json';
import dummy from './dummyData/dummy.json';

import {TreeNode} from './interfaces.ts';

class SomeDataService {
    private static instance: SomeDataService;
    private readonly apiUrl: string;
    private readonly localData: { [key: string]: TreeNode[] };

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
        this.localData = {
            views: views.value,
            servers: servers.value,
            cubes: cubes.value,
            dummy: dummy.value,
        };
    }

    public static getInstance(apiUrl: string): SomeDataService {
        if (!SomeDataService.instance) {
            SomeDataService.instance = new SomeDataService(apiUrl);
        }
        return SomeDataService.instance;
    }

    private getLocalData= (id:string):TreeNode[]  => {
        switch (id) {
            case 'A1_Distribution':
                return this.localData['cubes'];
            case 'Курсы валют':
                return this.localData['views'];
            default:
                return this.localData['dummy'];
        }
    }

    private handleApiError = (type: string, id?: string): TreeNode[] => {
        if (id) {
            console.error(`Error fetching ${type}, ${id}. Using local data`);
            return this.getLocalData(id);
        } else {
            console.error(`Error fetching ${type}. Using local data`);
            return this.localData[type];
        }
    }

    public fetchNode = async (type: string): Promise<TreeNode[]> => {
        try {
            const response: AxiosResponse<TreeNode[]> = await axios.get(`${this.apiUrl}/${type}`);
            return response.data;
        } catch (error) {
            return this.handleApiError(type);
        }
    }

    private fetchNodeChildren = async (type: string, id:string, childrenType: string): Promise<TreeNode[]> => {
        try {
            const response: AxiosResponse<TreeNode[]> = await axios.get(`${this.apiUrl}/${type}/${id}/${childrenType}`);
            return response.data;
        } catch (error) {
            return this.handleApiError(childrenType, id);
        }
    }

    public getChildren = async (type:string, id: string): Promise<TreeNode[]> => {
        let response: TreeNode[];
        switch (type){
            case 'servers':
                response = await this.fetchNodeChildren(type, id, 'cubes');
                break;
            case 'cubes':
                response = await this.fetchNodeChildren(type, id, 'views');
                break;
            default:
                break;
        }
        return response;
    }

}

const apiUrl = 'http://localhost:3001';
const someDataService = SomeDataService.getInstance(apiUrl);
export {someDataService};