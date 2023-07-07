const express = require('express');
const reservationController = require('../controllers/reservationController');
const { callbackErrorHandler } = require('../middleware/errorMiddlewareHandler');
const { validateId, validateDoubleId, validateQuery, validateReservation } = require('../middleware/requestValidationHandler');
const { isLoggedIn, isAdmin, isProfileOwner } = require('../middleware/authorizationHandler');

const router = express.Router();

router.get('/',
/* #swagger.tags = ['Reservation']
  #swagger.security = []
  #swagger.summary = 'Retrieve a list of reservations'
    #swagger.responses[200] = {
            description: 'Displaying a list of reservations',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/ReservationList' }
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
  callbackErrorHandler(reservationController.viewAllReservations));
router.post('/',
/* #swagger.tags = ['Reservation']

  #swagger.summary = 'Add a new Reservation'
      #swagger.responses[201] = {
            description: 'Responds with success flag and posted data',
            content: {
                'application/json': {
                    schema: {
                      $ref: '#/definitions/ReservationResponse'
                    }
                }
            }
        }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidReservation'
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
          "schema": { $ref: '#/definitions/ReservationBody' }
          }
        }
      }
    }
  */
  isLoggedIn, isAdmin, validateReservation, callbackErrorHandler(reservationController.createReservation));
router.get('/filter',
/* #swagger.tags = ['Reservation']
  #swagger.security = []

  #swagger.parameters = [
          {
              name: 'hour',
              in: 'query',
              description: 'filter by hour',
              schema: {
              type: 'string'
            }
            }
          ]

  #swagger.parameters = [
          {
            name: 'date',
            in: 'query',
            description: 'Filter by date',
            schema: {
              type: 'string'
            }
          }
          ]

  #swagger.parameters = [
          {
            name: 'dayOfWeek',
            in: 'query',
            description: 'Filter by day of the week',
            schema: {
              type: 'string'
            }
          }
          ]

  #swagger.summary = 'Filter reservations by date/hour/day of the week'
    #swagger.responses[200] = {
            description: 'Displaying a list of filtered reservations',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/ReservationFilteredList' }
                }
            }

        }

  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidFilterQuery'
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
  validateQuery, callbackErrorHandler(reservationController.filterReservation));
router.get('/:id',
/* #swagger.tags = ['Reservation']
#swagger.security = []

#swagger.summary = 'Retrieve a single Reservation'
    #swagger.responses[200] = {
            description: 'Displaying a single Reservation',
            content: {
                'application/json': {
                    schema: { $ref: '#/definitions/ReservationResponse' }
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
  validateId, callbackErrorHandler(reservationController.viewSingleReservation));
router.put('/:id',
/* #swagger.tags = ['Reservation']

  #swagger.summary = 'Update Reservation'
      #swagger.responses[202] = {
            description: 'Responds with success flag and posted data',
            content: {
                'application/json': {
                    schema: {
                      $ref: '#/definitions/ReservationResponse'
                    }
                }
            }
        }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidReservation'
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
          "schema": { $ref: '#/definitions/ReservationBody' }
          }
        }
      }
    }
*/
  validateId, isLoggedIn, isAdmin, validateReservation, callbackErrorHandler(reservationController.updateReservation));
router.put('/:id/add-player/:playerId',
/* #swagger.tags = ['Reservation']
#swagger.summary = 'Add a Player to a Reservation'
  #swagger.responses[200] = {
        description: 'Responds with success flag',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/ReservationPlayerResponse'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidDoubleId'
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
  validateDoubleId, isLoggedIn, isProfileOwner, callbackErrorHandler(reservationController.addPlayerToReservation));
router.put('/:id/player-withdraw/:playerId',
/* #swagger.tags = ['Reservation']
#swagger.summary = 'Withdraw a Player from Reservation'
  #swagger.responses[200] = {
        description: 'Responds with success flag',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/ReservationPlayerResponse'
                }
            }
        }
    }
  #swagger.responses[400] = {
    description: 'Responds with invalid request error message',
    content: {
        'application/json': {
            schema: {
              $ref: '#/definitions/InvalidDoubleId'
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
  validateDoubleId, isLoggedIn, isProfileOwner, callbackErrorHandler(reservationController.removePlayerFromReservation));
router.delete('/:id',
/* #swagger.tags = ['Reservation']
   #swagger.summary = 'Delete one Reservation'
  #swagger.responses[200] = {
        description: 'Responds with success flag and deleted data',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/ReservationResponse'
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
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.deleteReservation));
router.put('/cancel/:id',
/* #swagger.tags = ['Reservation']
#swagger.summary = 'Cancel one Reservation'
  #swagger.responses[200] = {
        description: 'Responds with success flag and deleted data',
        content: {
            'application/json': {
                schema: {
                  $ref: '#/definitions/ReservationResponse'
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
  validateId, isLoggedIn, isAdmin, callbackErrorHandler(reservationController.cancelReservation));
module.exports = router;
