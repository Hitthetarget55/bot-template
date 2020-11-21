const {readdirSync} = require('fs');
const path = require('path');
const cmdPath = path.join(__dirname, '../commands/')
module.exports = (client) => {
    readdirSync(cmdPath).forEach(dir => {
        const commands = readdirSync(cmdPath + `${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(cmdPath + `${dir}/${file}`)
            if(pull.name){
                client.commands.set(pull.name, pull);
            }else{
                continue;
            } 
            if(pull.aliases && Array.isArray(pull.aliases)){
                 pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
            }
        }
    });
    console.log("Commands loaded successfully.")
}
