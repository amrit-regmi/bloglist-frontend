import React, { useState,useImperativeHandle } from 'react'

const ToggleButton = React.forwardRef((props,ref) => {
  const [visible,setVisible] = useState(false)

  const hide = { display: visible ? 'none':'' }
  const show = { display: visible ? '':'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <button style={hide} onClick = {toggleVisibility}> {props.buttonLabelHidden}</button>
      <div style={show}>
        {props.children} <button onClick={toggleVisibility}>{props.buttonLabelVisible}</button>

      </div>
    </>
  )
})
ToggleButton.displayName = 'Togglable'
export default ToggleButton