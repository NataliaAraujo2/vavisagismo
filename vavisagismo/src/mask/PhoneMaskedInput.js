import React from 'react'
import InputMask  from "react-input-mask";

const PhoneMaskedInput = ({value, onChange, placeholder}) => {
  return (
    <InputMask mask="(99)99999-9999" value={value} onChange={onChange} placeholder={placeholder} />
  )
}

export default PhoneMaskedInput