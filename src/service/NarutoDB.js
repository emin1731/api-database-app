// Rick and Morty API


class NarutoDB {
    constructor() {
        // super(props);
        this._apiBase='https://narutodb.xyz/api/'
    }
    getResource = async (url) => {
        let res
        await fetch(`${this._apiBase}${url}`, {    
            mode: 'no-cors'
          })
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
        let result = await this.getResource(`character?page=${page}&limit=20`)
        // console.log(result.characters)
        result = result.characters
        return result.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        let character = await this.getResource(`character/${id}`)
        return this._transformCharacter(character, id)
    }
    getTotalCharacterCount = async () => {
        let data = await this.getResource(`character/`)
        data = data.totalCharacters
        return data
    }
    _transformCharacter(char, id) {
        return {
            id: char.id,
            name: char.name,
            images: char.images,
            debut: char.debut,
            family: char.family,
            jutsu: char.jutsu,
            natureType: char.natureType,
            personal: char.personal,
            tools: char.tools,
            uniqueTraits: char.uniqueTraits,
            voiceActors: char.voiceActors

            // died: char.died,
            // culture: char.culture
        }
    }

}


 
export default NarutoDB;

