import React, { useEffect, useState } from 'react'
import { fetchDailyChartData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyChartData()

            setChartData(dailyData)
        }

        fetchAPI()
    }, [])

    const LineChart = chartData[0] ? (
        <Line
            data={{
                labels: chartData.map(({ date }) =>
                    new Date(date).toDateString()
                ),
                datasets: [
                    {
                        data: chartData.map((data) => data.confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },
                    {
                        data: chartData.map((data) => data.deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    {
                        data: chartData.map((data) => data.recovered),
                        label: 'Recovered',
                        borderColor: 'green',
                        backgroundColor: 'rgba(0,255,0,0.5)',
                        fill: true,
                    },
                ],
            }}
        />
    ) : null

    const BarChart = confirmed ? (
        <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` },
            }}
        />
    ) : null

    return (
        <div className={styles.container}>{country ? BarChart : LineChart}</div>
    )
}

export default Chart
