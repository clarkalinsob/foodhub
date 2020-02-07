import React, { useState } from 'react'
import { Rating } from 'semantic-ui-react'

function RatingComponent() {
  const [rate, setRate] = useState('')

  const handleRate = (e, { rating, maxRating }) => setRate({ rating, maxRating })

  return (
    <>
      <Rating icon='star' maxRating={5} onRate={handleRate} />
      <pre>{JSON.stringify(rate, null, 2)}</pre>
    </>
  )
}

export default RatingComponent
