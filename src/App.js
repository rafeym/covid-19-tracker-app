import React, { useEffect, useState } from 'react'
import { fetchData } from './api'

import { Cards, CountryPicker, Chart } from './components'
import styles from './App.module.css'

import image from './static/main-img.png'

function App() {
    const [data, setData] = useState({})
    const [country, setCountry] = useState('')

    useEffect(() => {
        fetchData()
            .then((data) => {
                setData(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleCountryChange = async (country) => {
        const data = await fetchData(country)
        setData(data)
        setCountry(country)
    }

    return (
        <div className={styles.container}>
            <img className={styles.image} src={image} alt='COVID-19' />
            <Cards data={data} />
            <CountryPicker handleCountryChange={handleCountryChange} />
            <Chart country={country} data={data} />
        </div>
    )
}

export default App
