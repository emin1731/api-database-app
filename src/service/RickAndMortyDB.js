// Rick and Morty API
import { removeRedundantPath } from "../helpers/helpers"

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
    getName = async (arr) => {
        // let character = await this.getResource(`${arr}`)
        return arr.map(async item => {
            let char = await this.getResource(`${removeRedundantPath(item)}`)
            return this._transformResident(char)
        })
        // let name = {
        //     name: character.name,
        //     url: arr
        // }
        // return this._transformResident(character, arr)
    }
    getAllLocations = async (page) => {
        let result = await this.getResource(`location?page=${page}`)
        result = result.results
        
        return result.map(this._transformLocation)

    }
    getLocation = async (id) => {
            let location = await this.getResource(`location/${id}`)

            // Get Array of objects with resident name and url
            const residents = await Promise.all(
                location.residents.map((url) => 
                    fetch(url)
                    .then((r) => r.json())
                    .then((r) =>
                        this._transformResident(r)
                    )
                    )
            );
            console.log("LOCATION", residents)
            return this._transformLocation(location, id, residents)
    }

    _transformResident(item, path) {
        return {
            name: item.name,
            url: item.url
        }
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
    _transformLocation(loc, id, residents) {
        return {
            id: loc.id,
            name: loc.name,
            type: loc.type,
            dimension: loc.dimension,
            residents: residents,
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

