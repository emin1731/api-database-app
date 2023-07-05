
class NarutoDB {
    constructor() {
        // super(props);
        this._apiBase='https://api.narutodb.xyz/'
    }
    getResource = async (url) => {
        let res
        const addres = await fetch(`${this._apiBase}${url}`)
        .then(response => response.json())
        .then(data => {
            res = data
        })
        // const res = await addres.json();
        // if(!addres.ok) {
        //     throw new Error(`Could not fetch: ${url} Code: ${addres.status}`)
        // }
        console.log("DB RES", res.images)
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

