export const BASE_URL = 'http://localhost:3004/'

const request = async (url: string, data: any) => {
    const headersMultiPart = typeof data.body === 'string' ? {"Content-type": "application/json;charset=utf-8"} : {}

    const response = await fetch(url, {
        ...data,
        headers: {
            ...headersMultiPart,
        },
    });
    if (response.ok) {
        if (response.headers.get('Content-Length') === '0') {
            return true
        }
        const typeResponse = response.headers.get("Content-type");
        let result;
        if (typeResponse === 'aplication/text') {
            result = await response.text()
            return result
        }
        result = await response.json()
        return result;
    } else {
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("user");
            throw new Error("Unauthorized user");
        }
        if (response.status === 409) throw new Error('Already exists');
        else  throw {status: response.status}
    }

}

export const get = (url: string) => request(`${BASE_URL}${url}`, {method: "GET"})

export const post = (url: string, body: string | FormData) => {
    return request(`${BASE_URL}${url}`, {method: "POST", body})
}
export const patch = (url: string, body: string) => {
    return request(`${BASE_URL}${url}`, {method: "PATCH", body})
}
export const remove = (url: string) => request(`${BASE_URL}${url}`, {method: "DELETE"})