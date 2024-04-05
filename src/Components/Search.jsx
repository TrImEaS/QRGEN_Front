import { useState } from "react"
import Swal from 'sweetalert2'

export default function Search(){
  const [search, setSearch] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [resultData, setResultData] = useState([])

  const handleSelectChange = (event) => {
    if(event.target.value === 'all') {
      setSearch(event.target.value)
      setInputSearch('all')
    }
    else{
      setSearch(event.target.value)
      setInputSearch('')
    }
  }

  const handleInputSearchChange = (event) => {
    setInputSearch(event.target.value)
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ''
    const dateTime = new Date(dateTimeString)
    const date = dateTime.toLocaleDateString()
    const time = dateTime.toLocaleTimeString()
    return `Fecha: ${date}, Hora: ${time}`
  }

  const handleFetch = async () => {
    if (!search || !inputSearch) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor complete todos los campos del formulario!',
        timer: 3000,
        timerProgressBar: true
      })
      return
    }

    fetch(`https://www.line-technology.com.ar/billingData?${search}=${inputSearch}`, {
    // fetch(`http://localhost:8080/billingData?${search}=${inputSearch}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(data => {
      if(data && data.length === 0){
        Swal.fire({
          icon: 'warning',
          title: '¡No se encontraron datos, intente nuevamente!',
          timer: 3000,
          timerProgressBar: true
        })
      }
      else{
        setResultData(data)
      }
    })
    .catch(e => console.log('Error buscando datos, revisar los valores ingresados: ',e))
  }

  return (      
    <div className='flex w-full px-8 py-5 gap-10 flex-col min-w-[250px] min-h-screen items-center'>
      
      <section className='max-w-[450px] w-4/5 min-w-[280px] flex p-5 border-4 flex-col items-center gap-10 rounded-lg'>
        <article className="flex flex-col gap-2 items-center justify-center w-[250px] text-lg px-5">
          <h1 className="font-bold text-lg w-full">
            Seleccione una opcion de busqueda
          </h1>
          <select 
            name="search"
            className="text-black p-2 outline-none rounded-lg max-sm:text-sm" 
            id="search-select"
            onChange={handleSelectChange}
            value={search}
            required>
            <option value="" selected disabled>Seleccione una opcion</option>
            <option value="client">Numero de cliente</option>
            <option value="numberBill">Numero de factura</option>
            <option value="createDate">Fecha de creacion</option>
            <option value="all">Todos</option>
          </select>
        </article>

        <article className={`${search === 'all' ? 'hidden' : 'flex'} flex-col gap-2 items-center justify-center`}>
        {search === 'createDate' 
          ? ( 
            <>
              <label 
                className="font-bold text-lg"
                htmlFor="search-date-input">
                Ingrese valor
              </label>
              <input 
                id="search-date-input" 
                className="p-2 text-black outline-none w-full rounded-lg text-lg max-sm:text-sm"
                type="date"
                onChange={handleInputSearchChange}
                value={inputSearch}
                />
            </>
            )
          : (
            <>
              <label 
                className="font-bold text-lg"
                htmlFor="search-text-input">
                Ingrese valor
              </label>
              <input 
                id="search-text-input" 
                className="p-2 text-black outline-none w-full rounded-lg text-lg max-sm:text-sm"
                type="text" 
                onChange={handleInputSearchChange}
                value={inputSearch}
                />
            </>
            )
          }
        </article>

        <button 
          onClick={handleFetch}
          className="font-semibold py-3 px-5 text-lg max-sm:text-sm border-4 rounded-lg hover:text-black hover:bg-white duration-300">
          Buscar
        </button>
      </section>

      <section className="flex flex-col max-[1100px]:w-full gap-5">
        <h1 className="font-bold text-2xl border-b-4 w-[125px] border-orange-400">
          Resultado:
        </h1>
        <div className="w-full">
          {resultData.reverse().map(item => (
            <div 
              className="font-semibold text-lg"
              key={item.id}>
              <p>Cliente: 
                <span className="font-normal text-orange-400"> {item.client}</span>
              </p>

              <p>Numero de factura: 
                <span className="font-normal text-orange-400"> {item.numberBill}</span>
              </p>

              <p>Creado por:
                <span className="font-normal text-orange-400"> {item.user}</span>
              </p>

              <p>Fecha de creacion: 
                <span className="font-normal text-orange-400"> {formatDateTime(item.createDate)}</span>
              </p>

              <p>Compania: 
                <span className="font-normal text-orange-400"> {item.company}</span>
              </p>

              <p>Fecha de checkeo: 
                <span className="font-normal text-orange-400"> {item.checkDate === '0' ? 'Sin checkear' : item.checkDate }</span>
              </p>

              <p>Token de verificacion: 
                <span className="font-normal text-orange-400"> {item.verificationNumber}</span>
              </p>

              <p>QR Link: 
                <span className="font-normal text-orange-400 break-all"> {item.link}</span>
              </p>

              <br />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
