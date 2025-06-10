import React, { useEffect, useMemo, useRef, useState } from 'react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const CategoryChart = ({ dataset, label }) => {
  const [todo, setTodo] = useState([])
  const chartRef = useRef(null)

  useMemo(() => {
    const ary = []
    dataset?.forEach((data, idx) => {
      ary.push({
        label: data?.category,
        backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
        borderColor: getStyle('--cui-info'),
        pointHoverBackgroundColor: getStyle('--cui-info'),
        borderWidth: 2,
        data: data?.value,
      })
    })
    setTodo(ary)
  }, [dataset])

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: label,
          datasets: todo,
          // datasets: [
          //   {
          //     label: 'Cozzy Type',
          //     backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
          //     borderColor: getStyle('--cui-info'),
          //     pointHoverBackgroundColor: getStyle('--cui-info'),
          //     borderWidth: 2,
          //     data: [
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //     ],
          //   },
          //   {
          //     label: 'Vip',
          //     backgroundColor: 'transparent',
          //     borderColor: getStyle('--cui-success'),
          //     pointHoverBackgroundColor: getStyle('--cui-success'),
          //     borderWidth: 2,
          //     data: [
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //       random(50, 200),
          //     ],
          //   },
          // ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 100,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(100 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default CategoryChart
