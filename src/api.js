const urlUsers = "http://localhost:3000/users"
const urlBooks = "http://localhost:3000/books"
const urlModules = "http://localhost:3000/modules"

/*
const urlUsers = "http://aaronfloresapi.projecte1.es/api/users.php"
const urlBooks = "http://aaronfloresapi.projecte1.es/api/books.php"
const urlModules = "http://aaronfloresapi.projecte1.es/api/modules.php"
*/
export async function getDBUsers() {
    const response = await fetch(urlUsers)
    if (!response.ok) {
        throw Error("${response.status} de la BBDD: ${response.statusText}")
    }
    const users = await response.json()
    return users
}

export async function getDBUser(id) {
    const response = await fetch(urlUsers + "/" + id)
    if (!response.ok) {
        throw Error("${response.status} de la BBDD: ${response.statusText}")
    }
    const user = await response.json()
    return user
}

export async function addDBUser(user) {
    const response = await fetch(urlUsers, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const usuario = await response.json()
    return usuario
}

export async function removeDBUser(id) {
    const response = await fetch(urlUsers + "/" + id, {
        method: "DELETE"
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const usuario = await response.json()
    return usuario
}

export async function changeDBUser(user){
    const response = await fetch(urlUsers + "/" + user.id, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const usuario = await response.json()
    return usuario
}

export async function changeDBUserPassword(id, newPassword){
    const response = await fetch(urlUsers + "/" + id, {
        method: "PATCH",
        body: JSON.stringify({password: newPassword}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const usuario = await response.json()
    return usuario
}


//peticiones de books

export async function getDBBooks() {
    const response = await fetch(urlBooks)
    if (!response.ok) {
        throw Error("${response.status} de la BBDD: ${response.statusText}")
    }
    const books = await response.json()
    return books
}

export async function getDBBook(id) {
    const response = await fetch(urlBooks + "/" + id)
    if (!response.ok) {
        throw Error("${response.status} de la BBDD: ${response.statusText}")
    }
    const book = await response.json()
    return book
}

export async function addDBBook(book) {
    const response = await fetch(urlBooks, {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const libro = await response.json()
    return libro
}

export async function removeDBBook(id) {
    const response = await fetch(urlBooks + "/" + id, {
        method: "DELETE"
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const libro = await response.json()
    return libro
}

export async function changeDBBook(book){
    const response = await fetch(urlBooks + "/" + book.id, {
        method: "PUT",
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const libro = await response.json()
    return libro
}


// peticiones de modules

export async function getDBModules() {
    const response = await fetch(urlModules)
    if (!response.ok) {
        throw Error("${response.status} de la BBDD: ${response.statusText}")
    }
    const modules = await response.json()
    return modules
}

