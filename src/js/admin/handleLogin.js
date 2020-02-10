console.log('log me in')

const handleRedirect = () => {
  //history.back()//`/admin/svi-artikli/`
  window.location = `/admin/svi-admini/`
//   const url = `/admin/svi-admini/`
//   // TODO: should this be a fetch(GET) with jwt in headers instead?
//   const headers = new Headers()
//   headers.append('Accept', 'application/json')
//   headers.append('Authorization', `Bearer ${localStorage.token}`)
//   headers.append('x-token', localStorage.token)
// console.log(localStorage.token)
//   const req = new Request(url, {
//     method: 'GET',
//     redirect: 'follow',
//     headers,
//     mode: 'same-origin'
//   })

//   fetch(req)
//     .then((res) => {console.log(res)})
//     .catch(er => console.log(er))
}

const runValidation = () => {
  const username     = document.querySelector('#username').value,
        password     = document.querySelector('#password').value,
        adminError   = document.querySelector('.adminError')
  let   errorMessage = ''
  
  if (!username) errorMessage = 'Korisničko ime je obavezno!'
  else if (!password) errorMessage = 'Lozinka je obavezno polje!'
  if (errorMessage) {
    adminError.style.display = 'block'
    adminError.innerHTML = errorMessage
    return false
  }
  else {
    adminError.style.display = 'none'
    return { username, password }
  }
}

const runAuthentication = async () => {
  const reqData = runValidation()
  if(reqData) {
    const response = await fetch(`/admin/login`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })
    const data = await response.json()
    return data
  }
  
}

const handleLogin = async e => {
  e.preventDefault()
  const adminError = document.querySelector('.adminError')
  const response = await runAuthentication()
  if(!response) return false
  if (response.errorMessage) {
    adminError.style.display = 'block'
    adminError.innerHTML = response.errorMessage
  }
  else if (response.token) {
    adminError.style.display = 'none'
    localStorage.setItem('token', response.token)
    //document.cookie = ``
    document.cookie = `token=${response.token}`
    handleRedirect()
  }
}

const login = (() => {
  const button = document.querySelector('.admin-loginButton')
  button.addEventListener('click', handleLogin)
})()