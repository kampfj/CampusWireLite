const express = require('express')

const isAuthenticated = (req, res, next) => {
  console.log('checking if you are authenticated')
  next()
}

module.exports = isAuthenticated