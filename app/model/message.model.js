const uuid = require('uuid');

module.exports = mongoose => {
    var MessageSchema = mongoose.Schema(
        {
            uuid: String,
            room_id: String, 
            user_name: String, 
            user_id: String, 
            message: String, 
            attachment: String,
            deletedAt: Date,
        },
        { 
            timestamps: true 
        }
    );

    MessageSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;

        delete object.password;

        return object;
    });

    MessageSchema.pre('save', function (next) {
        this.uuid = uuid.v4()
        return next()
    });

    return mongoose.model("messages", MessageSchema); 
};