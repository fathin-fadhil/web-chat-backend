const User = require("../../app/model/user.model");  
const bcrypt = require('bcryptjs/dist/bcrypt') 

const db = require("../../app/model");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

//save your data. this is an async operation
//after you make sure you seeded all the users, disconnect automatically
users.map(async (p, index) => {
    p.password = await bcrypt.hash('secret', 10)
    new User({
        name: "Admin",
        email: "admin@example.com", 
    }),
    await p.save(p);
});