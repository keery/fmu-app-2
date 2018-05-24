export function saveData (key, data) {
    const entries = JSON.parse(localStorage.getItem(key) || '[]')
    for(let el of data) {
        entries.push(el)
    }
    localStorage.setItem(key, JSON.stringify(entries))
}

export function getData (key) {
    return JSON.parse(localStorage.getItem(key) || '[]')
}