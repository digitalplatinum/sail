module.exports = {


  friendlyName: 'add-public',


  description: 'Sign up for a new user account.',



  inputs: {

    title: {
      required: true,
      type: 'string',
      maxLength : 155,
      description: 'Title of the public entity.'
    },

    body: {
      required: true,
      type: 'string',
      maxLength: 555,
      example: 'body of public ',
    },

  },


  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided Title, Body are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    SlugExists: {
      statusCode: 409,
      description: 'The provided title is already in use.',
    },
 
  },


  fn: async function (inputs, exits) {

    var slug = inputs.title.toLowerCase().split(' ').join('_');
    
    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newEntityRecord = await Public.create(Object.assign({
      title: inputs.title,
      body: inputs.body,
      type:'post',
      slug : slug,
    }))
    .intercept('E_UNIQUE', 'SlugExists')
    .fetch();

    // Since everything went ok, send our 200 response.
    return exits.success({'status':true,'data':{'id':newEntityRecord.id}});
  }

};
