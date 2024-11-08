import { 
  DataProvider,
  fetchUtils,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  UpdateManyParams,
  DeleteParams,
  DeleteManyParams,
  PaginationPayload,
  SortPayload
} from 'react-admin';
import queryString from 'query-string';

// Добавяме типове за env
declare global {
  interface ImportMetaEnv {
    VITE_API_URL: string;
  }
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const auth = localStorage.getItem('auth');
    if (auth) {
        const { token } = JSON.parse(auth);
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
    getList: async (resource: string, params: GetListParams) => {
        const { pagination, sort, filter } = params;
        const { page = 1, perPage = 10 } = pagination || {};
        const { field = 'id', order = 'ASC' } = sort || {};

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(filter),
        };
        const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;

        const { json } = await httpClient(url);
        return {
            data: json.data,
            total: json.total,
        };
    },

    getOne: async (resource: string, params: GetOneParams) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
        return { data: json };
    },

    getMany: async (resource: string, params: GetManyParams) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
        const { json } = await httpClient(url);
        return { data: json };
    },

    getManyReference: async (resource: string, params: GetManyReferenceParams) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
        const { json } = await httpClient(url);
        return {
            data: json.data,
            total: json.total,
        };
    },

    create: async (resource: string, params: CreateParams) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return { data: json };
    },

    update: async (resource: string, params: UpdateParams) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return { data: json };
    },

    updateMany: async (resource: string, params: UpdateManyParams) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const { json } = await httpClient(`${apiUrl}/${resource}?${queryString.stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return { data: json };
    },

    delete: async (resource: string, params: DeleteParams) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: json };
    },

    deleteMany: async (resource: string, params: DeleteManyParams) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const { json } = await httpClient(`${apiUrl}/${resource}?${queryString.stringify(query)}`, {
            method: 'DELETE',
        });
        return { data: json };
    },
}; 