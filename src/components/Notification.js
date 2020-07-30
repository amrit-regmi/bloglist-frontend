import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  return (
    <div>
      <div className={notification.type }>{notification.message}</div>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification