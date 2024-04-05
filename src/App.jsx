import { useState } from 'react'
import Search from './Components/Search.jsx'
import QRGen from './Components/QRGen.jsx'
import Login from './Components/Login.jsx'

function App() {
  const [QRContainer, setQRContainer] = useState(true)
  const [searchContainer, setSearchContainer] = useState(false)
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState('') 

  const handleSearchContainer = () => {
    setQRContainer(false)
    setSearchContainer(true)
  }
  
  const handleQRContainer = () => {
    setSearchContainer(false)
    setQRContainer(true)
  }

  return (
    login === false 
      ?
      <Login loginSetter={setLogin} userSetter={setUser}/>
      :
      <section className="w-full min-h-screen flex items-center bg-[#191625] text-white text-xl flex-col">

        {/*Nav*/}
        <nav className='w-full bg-[#2b2640] h-[80px] flex items-center justify-evenly'>
          <button
            onClick={handleQRContainer} 
            className='font-semibold h-10 px-2 border-b-4 border-orange-500 hover:text-orange-500 duration-300'>
            Crear QR
          </button>
          <button 
            onClick={handleSearchContainer} 
            className='font-semibold h-10 px-2 border-b-4 border-orange-500 hover:text-orange-500 duration-300'>
            Buscar
          </button>
        </nav>

        {/*Generar QR*/}
        <div className={`${QRContainer ? 'flex' : 'hidden'} w-full flex-col justify-center items-center gap-3 py-10`}>
          <QRGen username={user}/>
        </div>

        {/*Buscar*/}
        <div className={`${searchContainer ? 'flex' : 'hidden'} w-full py-10`}>
          <Search/>
        </div>
      </section>
  )
}

export default App
// billingDataRouter.get('/', BillingDataController.getAll)
// billingDataRouter.post('/', BillingDataController.create)

// billingDataRouter.get('/:id', BillingDataController.getById)
// billingDataRouter.patch('/:id', BillingDataController.update)

// billingDataRouter.get('/createDate/byDate/:date', BillingDataController.getCreateDateByDate)
// billingDataRouter.get('/createDate/byTime/:time', BillingDataController.getCreateDateByTime)

// billingDataRouter.get('/checkDate/byDate/:date', BillingDataController.getCheckDateByDate)
// billingDataRouter.get('/checkDate/byTime/:time', BillingDataController.getCheckDateByTime)