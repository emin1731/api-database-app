export function removeRedundantPath(url) {
    const res = url.replace("https://rickandmortyapi.com/api", "")
    return res
}