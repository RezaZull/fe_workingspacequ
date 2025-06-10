import React, { useEffect, useMemo, useRef } from 'react'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'

export const FeedbackChart = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current
      if (chartInstance) {
        const { options } = chartInstance

        if (options.plugins?.legend?.labels) {
          options.plugins.legend.labels.color = getStyle('--cui-body-color')
        }

        chartInstance.update()
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  const dataset = {
    labels: data?.label,
    datasets: [
      {
        backgroundColor: ['#00D8FF', '#DD1B16'],
        data: data?.data,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
  }

  return (
    <>
      {data != undefined ? (
        <CChart
          type="pie"
          data={dataset}
          options={options}
          ref={chartRef}
          style={{ height: '280px', margin: 'auto' }}
        />
      ) : null}
    </>
  )
}
