import { useEffect, useState, useRef } from 'react'

import './graph.css'

const ANIMATION_DELAY = 100

const NUMBER = 20

const Graph = () => {
  const [array, setArray] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    setArray(generateArray())
  }, [])

  const swap = (el1, el2) =>
    new Promise(resolve => {
      const temp = el1.style.transform
      el1.style.transform = el2.style.transform
      el2.style.transform = temp

      window.requestAnimationFrame(() => {
        setTimeout(() => {
          containerRef.current.insertBefore(el2, el1)
          resolve()
        }, ANIMATION_DELAY)
      })
    })

  const bubbleSort = async () => {
    const bars = document.getElementsByClassName('graph-item')

    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < bars.length - i - 1; j++) {
        const barOne = bars[j]
        const barTwo = bars[j + 1]

        await new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, ANIMATION_DELAY)
        })

        let val1 = parseInt(barOne.childNodes[1].innerHTML)
        let val2 = parseInt(barTwo.childNodes[1].innerHTML)
        if (val1 > val2) {
          await swap(barOne, barTwo)
        }
        
      }
    }
    console.log('Sorted!!')
  }

  return (
    <>
      <div ref={containerRef} className="graph-container">
        {array.map((val, i) => {
          return (
            <div
              className="graph-item"
              key={i}
              style={{
                transform: `translate(${i}px)`
              }}
            >
              <div
                className="graph-bar"
                style={{
                  height: `${val * 3}px`,
                  backgroundColor: `rgb(${randomNums(0, 255)}, ${randomNums(
                    0,
                    255
                  )}, ${randomNums(0, 255)})`
                }}
              ></div>
              <div className="graph-item-value">{val}</div>
            </div>
          )
        })}
      </div>
      <button
        className="btn"
        onClick={() => {
          bubbleSort()
        }}
      >
        Click to Sort
      </button>
    </>
  )
}

export default Graph

export const randomNums = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const generateArray = () => {
    const arr = []
    for (let i = 0; i < NUMBER; i++) {
      arr.push(randomNums(20, 100))
    }
    return arr
  }