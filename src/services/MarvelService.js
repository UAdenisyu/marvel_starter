import noImg from '../resources/img/image_not_available.jpg';

export default class MarvelService {
    
    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'apikey=0480d6b0253eac4f592683cd2d95a272';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}?limit=9&${this._apiKey}`);
        return res.data.results.map(this._tranformCharacter)
    } 

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
        return this._tranformCharacter(res.data.results[0]);
    }



    _tranformCharacter = (char) => {
        return {  
            name: char.name,
            description: char.description === "" ? 'No information about this character :((' : char.description.length < 150 ? char.description : char.description.slice(0, 149) + '...',
            thumbnail: char.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? noImg : char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url}
    }
}

