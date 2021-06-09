const url = document.getElementById("url"),
    form = document.getElementById("form"),
    tbody = document.getElementById('tbody'),
    urls = {}

document.addEventListener("DOMContentLoaded", async () => {
    url.focus()
    const data = await fetch('/urls')
    const jsonValue = await data.json()
    for (let i of jsonValue.urls) {
        const { full, short } = i
        urls[short] = full
    }
    addRow()
})

form.onsubmit = () => {
    const URL = url.value.trim()
    const post = async () => {
        const uri = await fetch("/addurl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: URL
            })
        })
        const json = await uri.json()
        return json
    }
    post()
        .then(res => {
            if (!urls[res.shorten]) {
                urls[res.shorten] = URL
                addRow()
            }
        })
        .catch(err => console.log(err))
    event.preventDefault()
}

const addRow = () => {
    tbody.innerHTML = ""
    for (let [k, v] of Object.entries(urls)) {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const a1 = document.createElement('a')
        a1.target = "_blank"
        a1.href = v
        a1.textContent = v.length > 25 ? v.split('/').slice(0, 3).join('/') + "/..." : v
        td1.appendChild(a1)

        const td2 = document.createElement('td')
        const a2 = document.createElement('a')
        a2.target = "_blank"
        a2.href = location.href + k
        a2.textContent = k
        td2.appendChild(a2)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tbody.appendChild(tr)
    }
}