import mongoose , {Document, Schema, Types} from "mongoose"

export interface PlanType extends Document {
    user_id: Types.ObjectId,
    place_ids: Types.ObjectId[],
    google_api_result: string,
}

const planSchema: Schema<PlanType> = new Schema<PlanType>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    place_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: "Place",
            required: true,
        },
    ],
    google_api_result: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const PlanModel =
    (mongoose.models.Plan as mongoose.Model<PlanType>) || mongoose.model<PlanType>("Plan" , planSchema);

export default PlanModel;
