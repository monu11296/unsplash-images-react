import axios from 'axios'
import { UNSPLASH_API, CLIENT_ID } from '../constants'

export const getImages = async (
    endpoint?: string,
    body: any = {},
) => {

    let resp = await axios({
        method: 'get',
        baseURL: UNSPLASH_API,
        url: endpoint,
        data: body,
        params: {
            ...body,
            client_id: CLIENT_ID
        },
        transformRequest: data => {
            return data
        },
    })
        .then(response => response.data)
        .catch(error => error)

    return resp
}