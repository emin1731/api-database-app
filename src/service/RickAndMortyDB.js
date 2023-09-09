// Rick and Morty API


class RickAndMortyDB {
    constructor() {
        this._apiBase='https://rickandmortyapi.com/api/'
    }
    getResource = async (url) => {
        let res
        await fetch(`${this._apiBase}${url}`)
        .then(response => response.json())
        .then(data => {
            res = data
        })
        .catch(
            console.log('Fetch error', url)
        )
        return res;
    }
    getAllCharacters = async (page) => {
        let result = await this.getResource(`character?page=${page}`)
        result = result.results
        return result.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        let character = await this.getResource(`character/${id}`)
        return this._transformCharacter(character, id)
    }
    getAllLocations = async (page) => {
        let result = await this.getResource(`location?page=${page}`)
        result = result.results
        return result.map(this._transformLocation)

    }
    getLocation = async (ref) => {
        // if(type === "url") {
            // const url = ref.replace("https://rickandmortyapi.com/api/", "")
            // const location = await this.getResource(url)
            // return this._transformLocation(location)
        // }
        // if(type === "id") {
            let location = await this.getResource(`location/${ref}`)
            // location = location.results
            console.log("LOCATION", location)
            return this._transformLocation(location, ref)
        // }
    }
    _transformCharacter(char, id) {
        return {
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            type: char.type,
            gender: char.gender,
            image: char.image,
            origin: char.origin,
            location: char.location,
            episode: char.episode,
            url: char.url,
            created: char.created,
        }
    }
    _transformLocation(loc, id) {
        return {
            id: loc.id,
            name: loc.name,
            type: loc.type,
            dimension: loc.dimension,
            residents: loc.residents,
            url: loc.url,
            created: loc.created,
        }
    }
    _transformEpisode(ep, id) {
        return {
            id: ep.id,
            name: ep.name,
            air_date: ep.air_date,
            episode: ep.episode,
            characters: ep.characters,
            url: ep.url,
            created: ep.created
        }
    }

}

 
export default RickAndMortyDB;

