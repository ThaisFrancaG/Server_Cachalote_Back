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
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
function signUp(createUserData) {
    return __awaiter(this, void 0, void 0, function () {
        var name, email, checkEmail, password, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = createUserData.name, email = createUserData.email, checkEmail = createUserData.checkEmail, password = createUserData.password;
                    if (email !== checkEmail) {
                        throw { code: 400, message: "Por favor, repita o e-mail corretamente" };
                    }
                    return [4 /*yield*/, checkUser(email)];
                case 1:
                    user = _a.sent();
                    if (user.length > 0) {
                        throw {
                            code: 409,
                            message: "Já existe uma conta para esse e-mail! Por favor, faça login"
                        };
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, newUser(name, email, password)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    throw {
                        code: 444,
                        message: "Algo deu errado! Tente novamente mais tarde"
                    };
                case 5: return [2 /*return*/];
            }
        });
    });
}
function signIn(createUserData) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = createUserData.email, password = createUserData.password;
                    return [4 /*yield*/, checkUser(email)];
                case 1:
                    user = _a.sent();
                    if (user.length === 0) {
                        throw {
                            code: 401,
                            message: "E-mail nâo cadastrado.\n Faça cadastro antes de logar!"
                        };
                    }
                    return [4 /*yield*/, checkPassword(user[0].password, password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, newSession(email)];
                case 3:
                    token = _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
}
function checkUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.userByEmail(email)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
function checkPassword(userPassword, password) {
    return __awaiter(this, void 0, void 0, function () {
        var checkPassword;
        return __generator(this, function (_a) {
            checkPassword = bcrypt.compareSync(password, userPassword);
            if (!checkPassword) {
                throw {
                    code: 401,
                    message: "Não foi possível realizar login \n confira seus dados"
                };
            }
            return [2 /*return*/];
        });
    });
}
function newUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    passwordHash = bcrypt.hashSync(password, 10);
                    return [4 /*yield*/, userRepository.newUser(name, email, passwordHash)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newSession(email) {
    return __awaiter(this, void 0, void 0, function () {
        var passKey, token;
        return __generator(this, function (_a) {
            passKey = process.env.JWT_SECRET;
            try {
                token = jwt.sign({ email: email }, passKey, {
                    expiresIn: "30d",
                    algorithm: "HS256"
                });
                return [2 /*return*/, token];
            }
            catch (error) {
                throw {
                    code: 400,
                    message: "Não foi possível realizar login \n Tente novamente mais tarde"
                };
            }
            return [2 /*return*/];
        });
    });
}
export { signUp, signIn, checkUser };
//# sourceMappingURL=userAuthService.js.map