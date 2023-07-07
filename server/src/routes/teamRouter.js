const express = require('express');
const teamController = require('../controllers/teamController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateTeam } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Team']
  #swagger.summary = 'Retrieve a list of teams'
  #swagger.responses[200] = {
      description: 'Responds with success flag and requested data.',
      content: {
          'application/json': {
              schema: { $ref: '#/definitions/TeamList' }
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

*/
  isLoggedIn, isAdmin, callbackErrorHandler(teamController.viewAllTeams));
router.get('/:id',
/* #swagger.tags = ['Team']
  #swagger.summary = 'Retrieve a single team'
  #swagger.responses[200] = {
      description: 'Responds with a success flag and requested data',
      content: {
          'application/json': {
              schema: { $ref: '#/definitions/TeamResponse' }
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

*/

  validateId, isLoggedIn, isAdmin, callbackErrorHandler(teamController.viewSingleTeam));
router.put('/:id',
/* #swagger.tags = ['Team']

  #swagger.summary = 'Update a single Team'

  #swagger.responses[202] = {
      description: 'Responds with updated team and success flag',
      content: {
          'application/json': {
              schema: { $ref: '#/definitions/TeamResponse' }
          }
      }
    }
 #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidTeam'
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
          "schema": { $ref: '#/definitions/TeamBody' }
          }
        }
      }
    }

*/
  validateId, isLoggedIn, isAdmin, validateTeam, callbackErrorHandler(teamController.updateTeam));
router.delete('/:id',
/* #swagger.tags = ['Team']

  #swagger.summary = 'Delete a single Team'
    #swagger.responses[200] = {
        description: 'Responds with a success flag and delete data',
        content: {
            'application/json': {
                schema: { $ref: '#/definitions/TeamResponse' }
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

*/
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(teamController.deleteTeam));

module.exports = router;
