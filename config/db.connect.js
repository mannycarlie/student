
module.exports = function (mongoose) {

    mongoose.connection.on("connected", (ref) => {
        console.log(`Successfully connected to database on startup `);
    });

    mongoose.connect("mongodb://localhost:27017/studentdb", (err) => {
        if (err)
            throw err
    })
}