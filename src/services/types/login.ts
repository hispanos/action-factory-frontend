import { User } from "../../interfaces/User";

export type LoginResponse = {
    token: string;
    user: User;
};