/* eslint-disable max-len */
const express = require('express');
const userController = require('../controllers/userController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateUser } = require('../middleware/requestValidationHandler');
const { isProfileOwner, isLoggedIn } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['User']
  #swagger.security = []

  #swagger.summary = 'Retrieve a list of users'
    #swagger.responses[200] = {
            description: 'Displaying a list of users',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/UserList' }
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
*/
  callbackErrorHandler(userController.viewAllUsers));
router.get('/:id/history',
/* #swagger.tags = ['User']
   #swagger.summary = 'View history of user'
  #swagger.responses[200] = {
        description: 'Responds with history data for user',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/UserHistory'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidId'
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
*/
  validateId, isLoggedIn, isProfileOwner, callbackErrorHandler(userController.viewHistory));
router.post('/',
/* #swagger.tags = ['User']
  #swagger.security = []

  #swagger.summary = 'Add a new User'
      #swagger.responses[201] = {
            description: 'Responds with success flag and posted data',
            content: {
                'application/json': {
                    schema: {
                      $ref: '#/definitions/UserResponse'
                    }
                }
            }
        }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidUser'
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
          "schema": { $ref: '#/definitions/UserBody' }
          }
        }
      }
    }
*/
  validateUser, callbackErrorHandler(userController.registerUser));
router.get('/:id',
/* #swagger.tags = ['User']
  #swagger.security = []

  #swagger.summary = 'Retrieve a single user'
    #swagger.responses[200] = {
            description: 'Displaying a single user',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/UserResponse' }
                }
            }

        }

    #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidId'
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
*/
  validateId, callbackErrorHandler(userController.viewSingleUser));
router.put('/:id',
/* #swagger.tags = ['User']

  #swagger.summary = 'Update User'
      #swagger.responses[201] = {
            description: 'Responds with success flag and posted data',
            content: {
                'application/json': {
                    schema: {
                      $ref: '#/definitions/UserResponse'
                    }
                }
            }
        }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidUser'
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
          "schema": { $ref: '#/definitions/UserBody' }
          }
        }
      }
    }
*/
  validateId, isLoggedIn, isProfileOwner, validateUser, callbackErrorHandler(userController.updateUser));
router.delete('/:id',
/* #swagger.tags = ['User']
   #swagger.summary = 'Delete one User'
  #swagger.responses[200] = {
        description: 'Responds with success flag and deleted data',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/UserResponse'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidId'
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
*/
  validateId, isLoggedIn, isProfileOwner, callbackErrorHandler(userController.deleteUser));

module.exports = router;
