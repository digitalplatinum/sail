module.exports = {


    friendlyName: 'View edit password',
  
  
    description: 'Display "Edit password" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/public/add-public'
      }
  
    },
  
  
    fn: async function (inputs, exits) {
  
      return exits.success();
  
    }
  
  
  };
  