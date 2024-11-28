import React from 'react'

const Calender = ({ value, onChange }) => {
  return (
    <div>
      <input type="date" value={value || ""}
      className="w-[300px] border border-slate-200 ml-3 my-4 rounded-lg py-3 px-5 outline-none bg-transparent"
      onChange={(e) => onChange(e.target.value || null)
      
      }
  /></div>
  )
}

export default Calender

//crated a calender components (manually created)
