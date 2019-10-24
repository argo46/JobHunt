const signupModels = require('../models/signup')

module.exports = {
  emailText: (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  },

  isNotUndefine: (data) => {
    if (Array.isArray(data)) {
      let allTrue = true
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== undefined) {
          data[i] = true
        } else {
          data[i] = false
          allTrue = false
        }
      }
      data.allTrue = allTrue
      return data
    } else {
      if (data !== undefined) {
        data = true
      } else {
        data = false
      }
      return data
    }
  },
  isEmailOrUserNameExistInDb: async (email, userName) => {
    const result = {}
    // check email
    await signupModels.checkEmailAndUsername(email, '')
      .then(data => {
        if (data.length > 0) {
          result.emailInvalid = true
        } else {
          result.emailInvalid = false
        }
      })
      .catch(err => {
        console.log(err)
      })

    // check username
    await signupModels.checkEmailAndUsername('', userName)
      .then(async data => {
        if (data.length > 0) {
          result.usernameInvalid = true
        } else {
          result.usernameInvalid = false
        }
      })
      .catch(err => {
        console.log(err)
      })
    return result
  },

  invalid: (res, message, status) => {
    res.status(400)
    res.json({
      status,
      message
    })
  }

}
