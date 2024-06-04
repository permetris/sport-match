const express = require('express');
const cityController = require('../controllers/cityController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateCity } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['City']
  #swagger.security = []
  #swagger.summary = 'Retrieve a list of citys'
    #swagger.responses[200] = {
            description: 'Displaying a list of citys',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/CityList' }
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
    callbackErrorHandler(cityController.viewAllCitys));
router.post('/',
/* #swagger.tags = ['City']
  #swagger.summary = 'Add a new City'

  #swagger.responses[201] = {
        description: 'Responds with success flag and posted data',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/CityResponse'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidCity'
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
          "schema": { $ref: '#/definitions/CityBody' }
          }
        }
      }
    }
*/
    isLoggedIn, isAdmin, validateCity, callbackErrorHandler(cityController.createCity));
router.get('/:id',
    /* #swagger.tags = ['City']
  #swagger.security = []
  #swagger.summary = 'Get a single City'
    #swagger.responses[200] = {
            description: 'Displaying a list of citys',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/CityResponse' }
                }
            }
        }
  #swagger.responses[400] = {
  description: 'Responds with invalid request error message',
  content: {
      'application/json': {
          schema: {
            $ref: '#/definitions/InvalidCity'}
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

    validateId, callbackErrorHandler(cityController.viewSingleCity));
router.put('/:id',
/* #swagger.tags = ['City']
  #swagger.summary = 'Update an existig city'
  #swagger.responses[202] = {
          description: 'Responds with success flag and updated data',
          content: {
              'application/json': {
                  schema: {
                    $ref: '#/definitions/CityResponse'
                  }
              }
          }
      }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidCity'
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
          "schema": { $ref: '#/definitions/CityBody' }
          }
        }
      }
    }
*/
    validateId, isLoggedIn, isAdmin, validateCity, callbackErrorHandler(cityController.updateCity));
router.delete('/:id',
/* #swagger.tags = ['City']
  #swagger.summary = 'Delete one City'
  #swagger.responses[200] = {
        description: 'Responds with success flag and deleted data',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/CityResponse'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidCity'
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
    validateId, isLoggedIn, isAdmin, callbackErrorHandler(cityController.deleteCity));

module.exports = router;
