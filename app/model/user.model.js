const uuid = require('uuid');

module.exports = mongoose => {
    var UserSchema = mongoose.Schema(
        {
            uuid: String,
            name: String,
            email: String,
            password: String,
            deletedAt: Date,
        },
        { 
            timestamps: true 
        }
    );

    UserSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;

        delete object.password;

        return object;
    });

    UserSchema.pre('save', function (next) {
        this.uuid = uuid.v4()
        return next()
    });

    return mongoose.model("users", UserSchema); 
};