import { createQR, createCode } from '../../createQrCode.js'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function QRGen({ username }) {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

  const [createDate] = useState(formattedDate) // Fecha actual
  const [company, setCompany] = useState('')
  const [clientNumber, setClientNumber] = useState(0)
  const [billingNumber, setBillingNumber] = useState(0)

  const handleGenerateQR = async () => {
    if (!company || !clientNumber || !billingNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor complete todos los campos del formulario!',
        timer: 3000,
        timerProgressBar: true
      })
      return
    }

    try {
      const codeData = await createCode()
      const qrDataUrl = await createQR({name: codeData.name})
      
      // Convertir el contenido HTML en una cadena
      const htmlContentString = codeData.htmlContent

      // Crear un nuevo objeto FormData
      const formData = {
        user: username,
        createDate: createDate,
        company: company,
        client: clientNumber,
        numberBill: billingNumber,
        verificationNumber: codeData.validationCode,
        link: qrDataUrl.htmlLink,
        htmlContent: htmlContentString,
        fileName: `${codeData.name}.html`
      }

      // Hacer la solicitud POST al servidor
      fetch('https://www.line-technology.com.ar/billingData', {
      // fetch('http://localhost:8080/billingData', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar el archivo HTML')
        }
        console.log('Archivo HTML guardado en el servidor correctamente.')
        // Descargar la imagen del QR
        Swal.fire({
          icon: 'success',
          title: 'QR generado con exito!',
          timer: 2000,
          timerProgressBar: true
        })
        const qrLink = document.createElement('a')
        qrLink.href = qrDataUrl.QR
        qrLink.setAttribute('download', `${clientNumber}-${billingNumber}-${company}.png`)
        document.body.appendChild(qrLink)
        qrLink.click()
        document.body.removeChild(qrLink)
      })
      .catch(error => {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Ya existe un QR con los datos ingresados!',
          timer: 3000,
          timerProgressBar: true
        })
      })
        
    } catch (error) {
      console.error('Error generando y descargando archivos:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor generando QR, intente nuevamente',
        timer: 2000,
        timerProgressBar: true
      })
    }
  }

  return (
      <section className='flex w-3/4 min-w-[250px] border-4 p-8 flex-wrap items-center justify-evenly gap-10 rounded-lg'>
        <div className="flex flex-col gap-2 w-[280px]">
          <label className='font-semibold text-lg' htmlFor="company">
            Seleccione empresa
          </label>
          <select 
            name="company" 
            id="company"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            className="text-black rounded-lg p-2 w-full text-lg max-sm:text-sm"
            required>
            <option value={''} disabled selected>Seleccione empresa</option>
            <option value="realcolor">Real Color</option>
            <option value="technologyline">Technology Line</option>
            <option value="tline">T-Line</option>
            <option value="power">Power</option>
            <option value="linetechnology">Line Technology</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 w-[280px]">
          <label className='font-semibold text-lg' htmlFor="clientNumber">
            Ingrese numero de cliente
          </label>
          <input 
            type="number"
            className="outline-none rounded-lg p-2 w-full text-lg max-sm:text-sm text-black" 
            min={0}
            onChange={(e) => setClientNumber(e.target.value)}
            value={clientNumber}
            required/>
        </div>

        <div className="flex flex-col gap-2 w-[280px]">
          <label className='font-semibold text-lg' htmlFor="billingNumber">
            Ingrese numero de factura
          </label>
          <input 
            type="number"
            className="outline-none rounded-lg p-2 w-full text-lg max-sm:text-sm text-black" 
            min={0}
            onChange={(e) => setBillingNumber(e.target.value)}
            value={billingNumber}
            required/>
        </div>
        <div className='w-full flex items-center justify-center'>
          <button 
            onClick={handleGenerateQR}
            className="font-semibold py-3 px-5 text-lg border-4 rounded-lg hover:text-black hover:bg-white duration-300">
            Generar QR
          </button>
        </div>
      </section>
  )
}