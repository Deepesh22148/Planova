import mongoose , {Schema , Types , Document} from 'mongoose'

export interface HistoryType extends Document {
    user_id : Types.ObjectId,
    message : string, // stringify
}

const historySchema : Schema<HistoryType> = new Schema<HistoryType>({
    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message : {
        type: String,
        required: true,
    }
})

const HistoryModel =
    (mongoose.models.History as mongoose.Model<HistoryType>) || (mongoose.model<HistoryType>("History" , historySchema) )

export default HistoryModel
