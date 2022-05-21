var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import preferencesRepository from "../repositories/userPreferencesRepository.js";
var badRequest = {
    code: 400,
    message: "Algo deu errado! \n Confira seus dados"
};
function profilePreferences(token, userPreferences) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, userId, nickname, avatar, books, mangas, novels, comics, getUser, profileInfo, preferences;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userData(token)];
                case 1:
                    userInfo = _a.sent();
                    userId = userInfo.id;
                    nickname = userPreferences.nickname, avatar = userPreferences.avatar, books = userPreferences.books, mangas = userPreferences.mangas, novels = userPreferences.novels, comics = userPreferences.comics;
                    if (avatar === "") {
                        avatar = "default";
                    }
                    if (!(nickname === "")) return [3 /*break*/, 3];
                    return [4 /*yield*/, userRepository.userById(userId)];
                case 2:
                    getUser = _a.sent();
                    nickname = getUser.name;
                    _a.label = 3;
                case 3:
                    profileInfo = {
                        userId: userId,
                        avatar: avatar,
                        nickName: nickname,
                        likesBooks: books,
                        likesNovels: novels,
                        likesMangas: mangas,
                        likesComics: comics
                    };
                    return [4 /*yield*/, checkPreferences(userId, "profile")];
                case 4:
                    preferences = _a.sent();
                    preferences;
                    if (!(preferences === "update")) return [3 /*break*/, 5];
                    return [3 /*break*/, 8];
                case 5:
                    if (!(preferences === "create")) return [3 /*break*/, 7];
                    return [4 /*yield*/, createProfile(profileInfo)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7: throw badRequest;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function notificationsPreferences(token, userPreferences) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, userId, showPublicNotifications, showFriendsNotifications, getPublicNotifications, getFriendsNotifications, profileInfo, preferences;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userData(token)];
                case 1:
                    userInfo = _a.sent();
                    userId = userInfo.id;
                    showPublicNotifications = userPreferences.showPublicNotifications, showFriendsNotifications = userPreferences.showFriendsNotifications, getPublicNotifications = userPreferences.getPublicNotifications, getFriendsNotifications = userPreferences.getFriendsNotifications;
                    profileInfo = {
                        userId: userId,
                        showPublic: showPublicNotifications,
                        showFriends: showFriendsNotifications,
                        getPublic: getPublicNotifications,
                        getFriends: getFriendsNotifications
                    };
                    return [4 /*yield*/, checkPreferences(userId, "notifications")];
                case 2:
                    preferences = _a.sent();
                    if (!(preferences === "update")) return [3 /*break*/, 3];
                    return [3 /*break*/, 6];
                case 3:
                    if (!(preferences === "create")) return [3 /*break*/, 5];
                    return [4 /*yield*/, createNotifications(profileInfo)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5: throw badRequest;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function checkPreferences(userId, preferences) {
    return __awaiter(this, void 0, void 0, function () {
        var currentPreferences;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(preferences === "profile")) return [3 /*break*/, 2];
                    return [4 /*yield*/, preferencesRepository.profilePreferencesById(userId)];
                case 1:
                    currentPreferences = _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(preferences === "notifications")) return [3 /*break*/, 4];
                    return [4 /*yield*/, preferencesRepository.notificationsPreferencesById(userId)];
                case 3:
                    currentPreferences =
                        _a.sent();
                    return [3 /*break*/, 5];
                case 4: throw badRequest;
                case 5:
                    if (!currentPreferences) {
                        return [2 /*return*/, "create"];
                    }
                    else {
                        return [2 /*return*/, "update"];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function createProfile(preferences) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, preferencesRepository.createProfilePreferences(preferences)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createNotifications(preferences) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, preferencesRepository.createNotificationsPreferences(preferences)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function userData(token) {
    return __awaiter(this, void 0, void 0, function () {
        var passKey, email, getUser, userId, getPreferences, userInfo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    passKey = process.env.JWT_SECRET;
                    email = jwt.verify(token, passKey).email;
                    return [4 /*yield*/, userRepository.userByEmail(email)];
                case 1:
                    getUser = _a.sent();
                    userId = getUser[0].id;
                    return [4 /*yield*/, preferencesRepository.profilePreferencesById(userId)];
                case 2:
                    getPreferences = _a.sent();
                    userInfo = {
                        id: userId,
                        nickName: getPreferences === null ? "" : getPreferences.nickName,
                        avatar: getPreferences === null ? "" : getPreferences.avatar
                    };
                    return [2 /*return*/, userInfo];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    throw {
                        code: 444,
                        message: "Algo deu errado! Tente novamente mais tarde"
                    };
                case 4: return [2 /*return*/];
            }
        });
    });
}
export { userData, profilePreferences, notificationsPreferences, };
//# sourceMappingURL=userDetailsService.js.map