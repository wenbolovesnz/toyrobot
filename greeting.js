var chalk       = require('chalk');
var figlet      = require('figlet');
var clear      = require('clear');

module.exports = () => {
    clear();
    return chalk.green(
        figlet.textSync('Toybot', { horizontalLayout: 'full' })
    );
};