import React from 'react'

const ErrorMessage = ({message, onRetry}) => (
  <div>
    <p>Error loading todos: {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
)

export default ErrorMessage