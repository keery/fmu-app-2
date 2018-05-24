export function saveData (key, data) {
    const entries = JSON.parse(localStorage.getItem(key) || '[]')
    entries.push(data)
    localStorage.setItem(key, JSON.stringify(entries))
}

export function getData (key) {
    return JSON.parse(localStorage.getItem(key) || '[]')
}