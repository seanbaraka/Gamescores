export const options = {
    method: 'GET',
    url: process.env.RAPID_BASE_URL,

};

export const BASE_URL= process.env.RAPID_BASE_URL

export const LEAGUES = [39, 140, 135, 78, 61, 94, 88, 180];
export const CUPS = [544]
export const RAPID_HEADERS = {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY ?? '',
    'X-RapidAPI-Host': process.env.RAPID_HOST ?? '',
}