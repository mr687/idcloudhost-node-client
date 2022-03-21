import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"

export default class HttpClient {
    private client: AxiosInstance

    public constructor(baseURL: string, apiKey: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'apikey': apiKey,
            }
        })
    }

    public get<T>(url: string, params?: { [ key: string ]: any }): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client.get(url, { params })
                .then((res) => {
                    resolve(res.data)
                })
                .catch(this.apiErrorResponse.bind(this, reject))
        })
    }

    public post<T>(url: string, data?: { [ key: string ]: any }): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client.post(url, data)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(this.apiErrorResponse.bind(this, reject))
        })
    }

    public patch<T>(url: string, data?: { [ key: string ]: any }): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client.patch(url, data)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(this.apiErrorResponse.bind(this, reject))
        })
    }

    public put<T>(url: string, data?: { [ key: string ]: any }): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client.patch(url, data)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(this.apiErrorResponse.bind(this, reject))
        })
    }

    public delete<T>(url: string, data?: { [ key: string ]: any }): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client.delete(url, { data })
                .then((res) => {
                    resolve(res.data)
                })
                .catch(this.apiErrorResponse.bind(this, reject))
        })
    }

    private apiErrorResponse(reject: (reason?: any) => void, err: AxiosError) {
        const { response } = err
        let errorMessage = response?.statusText

        if (response?.data.message)  {
            errorMessage = response.data.message
        }
        if (response?.data.errors) {
            errorMessage = JSON.stringify(response.data.errors)
        }

        reject(new Error(errorMessage))
    }
}