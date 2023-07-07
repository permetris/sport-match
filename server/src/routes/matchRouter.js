const express = require('express');
const matchController = require('../controllers/matchController');
const { isLoggedIn, isAdmin } = require('../middleware/authorizationHandler');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateMatch, validateResult } = require('../middleware/requestValidationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Match']
  #swagger.security = []
  #swagger.summary = 'Retrieve a list of matches'
  #swagger.responses[200] = {
        description: 'Displaying a list of matches',
        content: {
            'application/json': {
                schema: { $ref: '#/definitions/MatchList' }
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
  callbackErrorHandler(matchController.viewAllMacthes));
router.get('/:id',
/* #swagger.tags = ['Match']
  #swagger.summary = 'Retrieve a single Match'
  #swagger.security = []
  #swagger.responses[200] = {
        description: 'Displaying a list of matches',
        content: {
            'application/json': {
                schema: { $ref: '#/definitions/MatchResponse' }
            }
          }
        }
  #swagger.responses[400] = {
  description: 'Responds with invalid request error message',
  content: {
      'application/json': {
          schema: {
            $ref: '#/definitions/InvalidMatch'
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
  validateId, callbackErrorHandler(matchController.viewSingleMatch));
router.put('/:id',
/* #swagger.tags = ['Match']
  #swagger.summary = 'Update a single Match'
  #swagger.requestBody = {
      required: true,
      content: {
        'application.json': {
          schema: { $ref: '#/definitions/MatchBody' }
        }
      }
    }
  #swagger.responses[202] = {
    description: 'Responds with success flag and updated data',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/MatchResponse'
            }
        }
    }
      }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidMatch'
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
  } */
  validateId, isLoggedIn, isAdmin, validateMatch, callbackErrorHandler(matchController.updateMatch));
router.delete('/:id',
/* #swagger.tags = ['Match']
  #swagger.summary = 'Delete a single Match'
  #swagger.requestBody = {
      required: true,
      content: {
        'application.json': {
          schema: { $ref: '#/definitions/MatchBody' }
        }
      }
    }
  #swagger.responses[200] = {
    description: 'Responds with success flag and deleted data',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/MatchResponse'
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
  } */

  validateId, isLoggedIn, isAdmin, callbackErrorHandler(matchController.deleteMatch));
router.put('/:id/result/:resId',
  /* #swagger.tags = ['Match']

    #swagger.summary = 'Update Result'
        #swagger.responses[200] = {
              description: 'Responds with success flag and posted data',
              content: {
                  'application/json': {
                      schema: {
                        $ref: '#/definitions/ResultResponse'
                      }
                  }
              }
          }
    #swagger.responses[400] = {
      description: 'Responds with invalid request error message',
      content: {
          'application/json': {
              schema: {
                $ref: '#/definitions/InvalidResult'
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
          "schema": { $ref: '#/definitions/ResultBody' }
          }
        }
      }
    }
  */
  isLoggedIn, isAdmin, validateResult, callbackErrorHandler(matchController.updateResult));
router.put('/:id/result',
  /* #swagger.tags = ['Match']

    #swagger.summary = 'Add a new Result'
        #swagger.responses[201] = {
              description: 'Responds with success flag and posted data',
              content: {
                  'application/json': {
                      schema: {
                        $ref: '#/definitions/ResultResponse'
                      }
                  }
              }
          }
    #swagger.responses[400] = {
      description: 'Responds with invalid request error message',
      content: {
          'application/json': {
              schema: {
                $ref: '#/definitions/InvalidResult'
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
          "schema": { $ref: '#/definitions/ResultBody' }
          }
        }
      }
    }
  */
  validateId, isLoggedIn, isAdmin, validateResult, callbackErrorHandler(matchController.addResult));
router.delete('/:id/result/:resId',
  /* #swagger.tags = ['Match']
    #swagger.summary = 'Delete Result'
        #swagger.responses[200] = {
              description: 'Responds with success flag',
              content: {
                  'application/json': {
                      schema: {
                        $ref: '#/definitions/ResultResponse'
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
  isLoggedIn, isAdmin, callbackErrorHandler(matchController.deleteResult));

module.exports = router;
