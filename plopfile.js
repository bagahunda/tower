module.exports = function(plop) {
  plop.setGenerator('block', {
    description: 'generate the block',
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Enter block\'s name',
        validate: function(value) {
          if ((/.+/).test(value)) {
            return true
          }
          return 'Name is requiered'
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: './src/templates/blocks/{{snakeCase name}}/{{snakeCase name}}.jade',
        templateFile: 'plop-templates/block.jade'
      }
    ]
  });

  plop.setGenerator('page', {
    description: 'generate the page',
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: 'Enter page\'s name',
        validate: function(value) {
          if ((/.+/).test(value)) {
            return true
          }
          return 'Name is requiered'
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: './src/templates/pages/{{snakeCase name}}.jade',
        templateFile: 'plop-templates/page.jade'
      }
    ]
  })
}
