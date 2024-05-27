import { useState } from "react"
import Swal from 'sweetalert2'

export default function Login({ loginSetter, userSetter }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if(!username || !password){
      Swal.fire({
        icon: 'warning',
        title: 'Se requiere llenar todos los campos',
        timer: 3000,
        timerProgressBar: true
      })
      return
    }

    fetch('https://line-technology.com.ar/users')
    .then(result => result.json())
    .then(data => {
      const users = data.users
      const foundUser = users.find(user => user.user === username && user.password === password)
      
      if (foundUser) {
        Swal.fire({
          icon: 'success',
          title: 'Logeado con éxito',
          timer: 2000,
          timerProgressBar: true,
          didClose: () => {
            setTimeout(() => {
              userSetter(username)
              loginSetter(true)
            })
          }
        })
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Usuario o contraseña incorrectos, intente nuevamente',
          timer: 3000,
          timerProgressBar: true
        })
      }
    })
    .catch(e => console.error('Error al loguearse: ', e))
  }

  return (
    <section className="flex flex-col gap-8 justify-center items-center min-h-screen w-screen bg-[#191625]">
      <h1 className="font-bold text-white font-serif text-2xl xl:text-4xl">
        QR Gen 1.8
      </h1>
      <form
        className="flex flex-col border-4 p-5 min-w-[250px] w-4/5 max-w-[450px] h-[350px] rounded-lg gap-8" 
        onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label
            className="text-white font-bold" 
            htmlFor="username-login">Ingrese usuario</label>
          <input
            id="username-login"
            type="text"
            value={username}
            className="w-full rounded-lg py-1 px-2 outline-none"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Ingrese nombre de usuario"
          />
        </div>

        <div className="flex flex-col gap-2">
        <label
          className="text-white font-bold" 
          htmlFor="password-login">Ingrese contraseña</label>
          <input
            id="password-login"
            type="password"
            value={password}
            className="w-full rounded-lg py-1 px-2 outline-none"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingrese su contraseña"
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <button 
            className="font-bold py-2 px-3 border-4 rounded-lg hover:text-black hover:bg-white duration-300 text-white"
            type="submit">
            Iniciar sesión
          </button>
        </div>
      </form>
    </section>
  )
}