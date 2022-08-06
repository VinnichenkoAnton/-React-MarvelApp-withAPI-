class MarvelService {
    _apiBase ='https://gateway.marvel.com:443/v1/public/';
    _apiKey ='apikey=42d4ead633f94298a7fcc4da8b05c981'
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._tranformCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._tranformCharacter(res.data.results[0]);
    }

    _tranformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Unfortunately, there is no information about this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;