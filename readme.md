# Set Project 
    npm i
    first change your database name into  config/config.json   at [development]  ENV 
    npx  sequelize db:create
    npx sequelize-cli db:migrate
    npx sequelize db:seed --seed 20221225211936-bus.js
    npx sequelize db:seed --seed 20221225212312-bus-seats.js
    npm start
