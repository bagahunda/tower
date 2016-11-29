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
        path: './src/templates/blocks/{{snakeCase name}}/{{snakeCase name}}.pug',
        templateFile: 'plop-templates/block.pug'
      },
      {
        type: 'add',
        path: './src/templates/blocks/{{snakeCase name}}/{{snakeCase name}}.styl',
        templateFile: 'plop-templates/block-styles.styl'
      },
      {
        type: 'add',
        path: './src/templates/blocks/{{snakeCase name}}/{{snakeCase name}}.js'
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
        path: './src/templates/pages/{{snakeCase name}}.pug',
        templateFile: 'plop-templates/page.pug'
      }
    ]
  })
}
