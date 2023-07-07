const express = require('express');
const fieldController = require('../controllers/fieldController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateField } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Field']
  #swagger.security = []
  #swagger.summary = 'Retrieve a list of fields'
    #swagger.responses[200] = {
            description: 'Displaying a list of fields',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/FieldList' }
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
  callbackErrorHandler(fieldController.viewAllFields));
router.post('/',
/* #swagger.tags = ['Field']
  #swagger.summary = 'Add a new Field'

  #swagger.responses[201] = {
        description: 'Responds with success flag and posted data',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/FieldResponse'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidField'
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
          "schema": { $ref: '#/definitions/FieldBody' }
          }
        }
      }
    }
*/
  isLoggedIn, isAdmin, validateField, callbackErrorHandler(fieldController.createField));
router.get('/:id',
  /* #swagger.tags = ['Field']
  #swagger.security = []
  #swagger.summary = 'Get a single Field'
    #swagger.responses[200] = {
            description: 'Displaying a list of fields',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/FieldResponse' }
                }
            }
        }
  #swagger.responses[400] = {
  description: 'Responds with invalid request error message',
  content: {
      'application/json': {
          schema: {
            $ref: '#/definitions/InvalidField'}
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

  validateId, callbackErrorHandler(fieldController.viewSingleField));
router.put('/:id',
/* #swagger.tags = ['Field']
  #swagger.summary = 'Update an existig field'
  #swagger.responses[202] = {
          description: 'Responds with success flag and updated data',
          content: {
              'application/json': {
                  schema: {
                    $ref: '#/definitions/FieldResponse'
                  }
              }
          }
      }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidField'
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
    description: 'Responds with notFound error message',
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
          "schema": { $ref: '#/definitions/FieldBody' }
          }
        }
      }
    }
*/
  validateId, isLoggedIn, isAdmin, validateField, callbackErrorHandler(fieldController.updateField));
router.delete('/:id',
/* #swagger.tags = ['Field']
  #swagger.summary = 'Delete one Field'
  #swagger.responses[200] = {
        description: 'Responds with success flag and deleted data',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/FieldResponse'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidField'
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
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(fieldController.deleteField));

module.exports = router;
