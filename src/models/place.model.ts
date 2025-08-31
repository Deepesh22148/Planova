import mongoose, {Schema, Document} from 'mongoose';

export interface placeDescriptionType extends Document {
    name: string, // tajMahal , Qutab Minar etc
    description: string, // place description about that place
    timings: string, // timings will be 10am - 11pm
    review: string, // one line review
    ratings: number, // basically out of 5 score
    days: string[], // days on which it is open default all seven days
    latitude: number,
    longitude: number,
    address : string
}

const placeDescriptionSchema: Schema<placeDescriptionType> = new Schema({
        name: {
            // trim is not required
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        timings: {
            type: String,
            required: true,
            default: "9:00AM to 5:00PM"
        },
        review: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 5
        },
        days: {
            type: [String],
            required: true,
            default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        address : {
            type : String ,
            requried : true,
        },
        latitude: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        },
        longitude: {
            type: Number,
            required: true,
            min: -180,
            max: 180
        }
    },
    {
        timestamps: true
    })

const PlaceModel =
    (mongoose.models.Place as mongoose.Model<placeDescriptionType>) || (mongoose.model<placeDescriptionType>("Place" , placeDescriptionSchema))

export default PlaceModel
