import React from 'react'

const StatCard = ({title, value}) => {
  return (
    <div>
      <div className="text-muted text-sm"> {title} </div>
      <div className="text-2xl font-bold text-primary-600 pl-5"> {value} </div>
    </div>
  )
}

export default StatCard