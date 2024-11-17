import { useEffect, useState } from 'react'
import Banner from "../components/Banner"
import Brand from "../components/Brand"
import Testimonial from "../components/Testimonial"
import { Title, TitleSm } from "../components/common/Title"

const Agency = () => {
  const [agencyData, setAgencyData] = useState(null)

  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const response = await fetch('/api/agency') // Assurez-vous que l'API route `/api/agency` est correcte
        if (response.ok) {
          const data = await response.json()
          setAgencyData(data)

        } else {
          console.error('Failed to fetch agency data')
        }
      } catch (error) {
        console.error('Error fetching agency data:', error)
      }
    }

    fetchAgencyData()
  }, [])

  if (!agencyData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <section className='agency bg-top'>
        <div className='container'>
          <div className='heading-title'>
            <TitleSm title={agencyData[0].sectionName} /> <br />
            <br />
            <Title title={agencyData[0].titleSection1} className='title-bg' />
          </div>

          <div className='content flex1'>
            <div className='left w-60 py'>
              <TitleSm title={agencyData[0].titleDesc1} />
              <p className='desc-p'>{agencyData[0].desc1}</p>
              <div className='grid-3'>
                <div className='box'>
                  <h1 className='indigo'>{agencyData[0].yearsExperience}+</h1>
                  <h3>Years of experience</h3>
                </div>
                <div className='box'>
                  <h1 className='indigo'>{agencyData[0].successfulCases}+</h1>
                  <h3>Successful cases</h3>
                </div>
                <div className='box'>
                  <h1 className='indigo'>{agencyData[0].industryAwards}+</h1>
                  <h3>Industry awards</h3>
                </div>
              </div>
            </div>
            <div className='right w-40 ml'>
              <img src={`http://localhost:3005/photos/${agencyData[0].cover1}`} alt='Agency Image 1' className='round' width='100%' height='100%' />
            </div>
          </div>

          <div className='content flex'>
            <div className='left w-40 py'>
              <img src={`http://localhost:3005/photos/${agencyData[0].cover2}`} alt='Agency Image 2' className='round' width='100%' height='100%' />
            </div>
            <div className='right w-60 ml'>
              <TitleSm title={agencyData[0].titleSection2} />
              <br />
              <p className='misson-p'>{agencyData[0].desc2}</p>
            </div>
          </div>
        </div>
      </section>

      <Brand />
      <Testimonial />
      <Banner />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

export default Agency
