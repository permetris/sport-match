const express = require('express');
const authController = require('../controllers/authController');
const { isLoggedIn, isProfileOwner } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateEmail, validatePassword } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.post('/login',
/* #swagger.tags = ['Login']
  #swagger.security = []

    #swagger.summary = 'Login user'
    #swagger.responses[200] = {
          description: 'Responds with success flag and successful login message',
          content: {
              'application/json': {
                  schema: {
                    $ref: '#/definitions/LoginResponse'
                  }
              }
          }
      }

    #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidPassword'
            }
        }
    }
  }

    #swagger.responses[404] = {
    description: 'Responds with not found error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpNotFound'
            }
        }
      }
    }

    #swagger.responses[500] = {
    description: 'Responds with error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpInternalError'
            }
        }
      }
    }

    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": { $ref: '#/definitions/LoginBody' }
          }
        }
      }
    }
*/
  callbackErrorHandler(authController.loginUser));
router.post('/forgotten-password',
/* #swagger.tags = ['Forgotten Password']
  #swagger.security = []

    #swagger.summary = 'Send email with recovery link for password'
    #swagger.responses[200] = {
          description: 'Responds with success flag and a message',
          content: {
              'application/json': {
                  schema: {
                    $ref: '#/definitions/ForgottenPassResponse'
                  }
              }
          }
      }

    #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidEmail'
            }
        }
    }
  }

    #swagger.responses[404] = {
    description: 'Responds with not found error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/UserNotFound'
            }
        }
      }
    }

    #swagger.responses[500] = {
    description: 'Responds with error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpInternalError'
            }
        }
      }
    }

    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": { $ref: '#/definitions/ForgottenPassBody' }
          }
        }
      }
    }
*/
  validateEmail, callbackErrorHandler(authController.forgottenPassword));
router.patch('/reset-password/:id/:emailToken',
/* #swagger.tags = ['Forgotten Password']
  #swagger.security = []

    #swagger.summary = 'Reset password with recovery link
    #swagger.responses[201] = {
          description: 'Responds with success flag and a message',
          content: {
              'application/json': {
                  schema: {
                    $ref: '#/definitions/PasswordUpdatedResponse'
                  }
              }
          }
      }

    #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidResetPassword'
            }
        }
    }
  }

    #swagger.responses[404] = {
    description: 'Responds with not found error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpNotFound'
            }
        }
      }
    }

    #swagger.responses[500] = {
    description: 'Responds with error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpInternalError'
            }
        }
      }
    }

    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": { $ref: '#/definitions/PasswordUpdateBody' }
          }
        }
      }
    }
*/
  validatePassword, callbackErrorHandler(authController.resetPasswordWithLink));
router.patch('/:id/reset-password',
/* #swagger.tags = ['Forgotten Password']

    #swagger.summary = 'Reset password for logged in user'
    #swagger.responses[201] = {
          description: 'Responds with success flag and a message',
          content: {
              'application/json': {
                  schema: {
                    $ref: '#/definitions/PasswordUpdatedResponse'
                  }
              }
          }
      }

    #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidResetPassword'
            }
        }
    }
  }

  #swagger.responses[401] = {
    description: 'Responds with unauthenticated error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpUnauthenticated'
            }
        }
    }
  }
  #swagger.responses[403] = {
    description: 'Responds with unauthorized error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpUnauthorized'
            }
        }
    }
  }

    #swagger.responses[404] = {
    description: 'Responds with not found error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpNotFound'
            }
        }
      }
    }

    #swagger.responses[500] = {
    description: 'Responds with error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/httpInternalError'
            }
        }
      }
    }

    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": { $ref: '#/definitions/PasswordUpdateBody' }
          }
        }
      }
    }
*/
  validateId, isLoggedIn, isProfileOwner, validatePassword, callbackErrorHandler(authController.resetPassword));
module.exports = router;
