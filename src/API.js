const API_KEY = 'Bearer OkQjQdCcocw81MiwIaSt0w9BOrWdTSnb';
const BASE_URL = 'https://api.fullcontact.com/v3/person.enrich';
const BACK_END_BASE_URL = 'http://localhost:8080/api/';

const fetchPerson = body => {
    const res = fetch(BASE_URL, {
        method: 'POST',
        headers: {
            "Authorization": `${API_KEY}`
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
    return res
}

const saveHistory = body => {
    const data = fetch(BACK_END_BASE_URL + 'history',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body)
        }).then((res) => res.text())
        .then(pData => {
            const json = pData === "" ? {} : JSON.parse(pData);
            return json;
        }).catch(error => error && alert('Back end is down, Query history is not saved'))
    return data
}

const fetchHistory = () => {
    const data = fetch(BACK_END_BASE_URL + 'query-history')
        .then(res => res.json())
    return data;
}

export { fetchPerson, saveHistory, fetchHistory }