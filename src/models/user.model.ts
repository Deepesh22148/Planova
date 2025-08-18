import mongoose , {Document, Schema} from 'mongoose';
import bcrypt from "bcrypt"

export interface UserType extends Document {
    name: string,
    email: string,
    phone: number,
    password: string,
}

const userSchema: Schema<UserType> = new Schema<UserType>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password too short"],
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordValid = async function (
    this: UserType,
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const UserModel =
    (mongoose.models.User as mongoose.Model<UserType>) || (mongoose.model("User" , userSchema));

export default UserModel;
