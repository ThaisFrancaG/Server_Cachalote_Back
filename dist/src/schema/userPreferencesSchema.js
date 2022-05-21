import Joi from "joi";
var allPreferencesSchema = Joi.object({
    nickname: Joi.string().allow(""),
    avatar: Joi.string().allow(""),
    books: Joi.boolean().required(),
    mangas: Joi.boolean().required(),
    novels: Joi.boolean().required(),
    comics: Joi.boolean().required(),
    showPublicNotifications: Joi.boolean().required(),
    showFriendsNotifications: Joi.boolean().required(),
    getPublicNotifications: Joi.boolean().required(),
    getFriendsNotifications: Joi.boolean().required()
});
var userPreferencesSchema = { allPreferencesSchema: allPreferencesSchema };
export default userPreferencesSchema;
//# sourceMappingURL=userPreferencesSchema.js.map