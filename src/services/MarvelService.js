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

    getAllCharacters = async (offset = Math.random() * 500, amount = 9) => {
        const res = await this.getResource(`${this._apiBase}?limit=${amount}&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    } 

    getCharacter = async (id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000), repeatRequest = true) => {
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
        if (repeatRequest && (res.data.results[0].thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
            || res.data.results[0].description === "")){
            return this.getCharacter();
        }
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {  
            id: char.id,
            name: char.name,
            description: char.description === "" ? 'No information about this character :((' : char.description.length < 150 ? char.description : char.description.slice(0, 149) + '...',
            thumbnail: char.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? noImg : char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.map(item => item.name)
        }
    }   
}