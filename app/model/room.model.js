const uuid = require('uuid');

module.exports = mongoose => {
    var RoomSchema = mongoose.Schema(
        {
            uuid: String,
            name: String, 
            joinedUser: Object,
            deletedAt: Date,
        },
        { 
            timestamps: true 
        }
    );

    RoomSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;

        delete object.password;

        return object;
    });

    RoomSchema.pre('save', function (next) {
        this.uuid = uuid.v4()
        return next()
    });

    return mongoose.model("rooms", RoomSchema); 
};