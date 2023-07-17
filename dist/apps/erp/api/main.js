/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/AppModule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const config_1 = __webpack_require__("./src/config.ts");
const auth_1 = __webpack_require__("./src/app/auth/index.ts");
const modules_1 = __webpack_require__("./src/app/modules/index.ts");
const UploadModule_1 = __webpack_require__("./src/app/modules/upload/UploadModule.ts");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const path_1 = __webpack_require__("path");
const pathFile_1 = __webpack_require__("./src/app/_shared/pathFile.ts");
const news_1 = __webpack_require__("./src/app/modules/news/index.ts");
const JwtStrategy_1 = __webpack_require__("./src/app/auth/strategy/JwtStrategy.ts");
const core_1 = __webpack_require__("@nestjs/core");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const AuthService_1 = __webpack_require__("./src/app/auth/AuthService.ts");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
const LoggingInterceptor_1 = __webpack_require__("./src/app/auth/LoggingInterceptor.ts");
const RolesGuard_1 = __webpack_require__("./src/app/auth/guard/RolesGuard.ts");
const AccessTokenStrategy_1 = __webpack_require__("./src/app/auth/strategy/AccessTokenStrategy .ts");
const RefreshTokenStrategy_1 = __webpack_require__("./src/app/auth/strategy/RefreshTokenStrategy.ts");
const dir = config_1.GlobalConfig.DIR;
let AppModule = class AppModule {
    constructor() {
    }
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(dir, pathFile_1.PATH_FILE_AVATAR_UPLOAD),
                renderPath: '/avatar-user',
            }, {
                rootPath: (0, path_1.join)(dir, pathFile_1.PATH_FILE_NEWS_UPLOAD),
                renderPath: '/image-cover',
            }, {
                rootPath: (0, path_1.join)(dir, pathFile_1.PATH_FILE_BANNER_UPLOAD),
                renderPath: '/image-banner',
            }),
            auth_1.AuthModule,
            modules_1.UserModule,
            news_1.NewsModule,
            UploadModule_1.UploadModule,
            modules_1.RoleModule,
            modules_1.BannerModule,
            modules_1.ProductModule,
            mongoose_1.MongooseModule.forRoot(config_1.GlobalConfig.Database.MongoURI),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: UserSchema_1.UserSchema }]),
            jwt_1.JwtModule.register({
                secret: config_1.GlobalConfig.Authentication.ServerKey,
                signOptions: { expiresIn: config_1.GlobalConfig.Authentication.ExpiresIn },
            }),
        ],
        providers: [JwtStrategy_1.JwtStrategy, AuthService_1.AuthService, jwt_1.JwtModule, jwt_1.JwtService,
            AccessTokenStrategy_1.AccessTokenStrategy,
            RefreshTokenStrategy_1.RefreshTokenStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: JwtStrategy_1.JwtStrategy
            },
            {
                provide: core_1.APP_GUARD,
                useClass: RolesGuard_1.RolesGuard
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: LoggingInterceptor_1.LoggingInterceptor,
            },
        ],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/_shared/pathFile.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PATH_AVATAR_DEFAULT = exports.PATH_FILE_BANNER_UPLOAD = exports.PATH_FILE_NEWS_UPLOAD = exports.PATH_FILE_AVATAR_UPLOAD = exports.PATH_FILES = void 0;
exports.PATH_FILES = '/uploads/';
exports.PATH_FILE_AVATAR_UPLOAD = './uploads/avatar-user/';
exports.PATH_FILE_NEWS_UPLOAD = './uploads/image-cover/';
exports.PATH_FILE_BANNER_UPLOAD = './uploads/image-banner/';
exports.PATH_AVATAR_DEFAULT = 'fa9decf0-421b-429a-9573-42b43a6e9806image_default.png';


/***/ }),

/***/ "./src/app/auth/AuthController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const api_interfaces_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const AuthService_1 = __webpack_require__("./src/app/auth/AuthService.ts");
const express_1 = __webpack_require__("express");
const passport_1 = __webpack_require__("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signIn(payload, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.signIn(payload.email, payload.password, res);
        });
    }
    signOut(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const email = req.user['Email'];
            res.clearCookie("access-token", { maxAge: 0 });
            res.clearCookie("refresh-token", { maxAge: 0 });
            this.authService.logout(email);
        });
    }
    getMyInfo(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return "success";
        });
    }
    refreshToken(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const email = req.user['Email'];
            return this.authService.refreshTokens(email, res);
        });
    }
    removeCookie(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.clearCookie("access-token", { maxAge: 0 });
            res.clearCookie("refresh-token", { maxAge: 0 });
        });
    }
};
tslib_1.__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(api_interfaces_1.APIEndpoints.Auth.SignIn),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof api_interfaces_1.Auth_SignInDTO !== "undefined" && api_interfaces_1.Auth_SignInDTO) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "signIn", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-access')),
    (0, common_1.Post)(api_interfaces_1.APIEndpoints.Auth.SignOut),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthController.prototype, "signOut", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-access')),
    (0, common_1.Get)(api_interfaces_1.APIEndpoints.Auth.GetMyInfo),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "getMyInfo", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-refresh')),
    (0, common_1.Post)(api_interfaces_1.APIEndpoints.Auth.Refresh),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _k : Object, typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "refreshToken", null);
tslib_1.__decorate([
    (0, common_1.Post)(api_interfaces_1.APIEndpoints.Auth.RemoveCookie),
    tslib_1.__param(0, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthController.prototype, "removeCookie", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof AuthService_1.AuthService !== "undefined" && AuthService_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./src/app/auth/AuthModule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const config_1 = __webpack_require__("./src/config.ts");
const modules_1 = __webpack_require__("./src/app/modules/index.ts");
const AuthController_1 = __webpack_require__("./src/app/auth/AuthController.ts");
const AuthService_1 = __webpack_require__("./src/app/auth/AuthService.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
const core_1 = __webpack_require__("@nestjs/core");
const JwtStrategy_1 = __webpack_require__("./src/app/auth/strategy/JwtStrategy.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            modules_1.UserModule,
            modules_1.RoleModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: UserSchema_1.UserSchema }]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: config_1.GlobalConfig.Authentication.ServerKey,
                signOptions: { expiresIn: config_1.GlobalConfig.Authentication.ExpiresIn },
            }),
        ],
        controllers: [AuthController_1.AuthController],
        providers: [AuthService_1.AuthService, JwtStrategy_1.JwtStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: JwtStrategy_1.JwtStrategy
            }
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./src/app/auth/AuthService.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const UserService_1 = __webpack_require__("./src/app/modules/users/UserService.ts");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const bcrypt = tslib_1.__importStar(__webpack_require__("bcrypt"));
const config_1 = __webpack_require__("./src/config.ts");
let AuthService = class AuthService {
    constructor(userModel, jwtService, userService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    signIn(user_email, user_password, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.listPermissions = [];
                const getUser = yield this.userModel.findOne({ 'Email': user_email });
                getUser.Role.Permissions.forEach(permission => {
                    this.listPermissions.push(Object.values(permission)[0]);
                });
                const user = {
                    display_name: getUser.DisplayName,
                    email: getUser.Email,
                    phone: getUser.Phone,
                    address: getUser.Address,
                    updated_at: getUser.UpdatedAt,
                    permissions: this.listPermissions,
                    avatar_url: getUser.AvatarUrl
                };
                const passWordMathch = yield bcrypt.compare(user_password, getUser.Password);
                if (!passWordMathch || !getUser) {
                    throw new common_1.HttpException({ status: "error", message: 'Email Or Password Invalid !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                const access_token = this.jwtService.sign(user, {
                    secret: config_1.GlobalConfig.Authentication.ServerKey,
                    expiresIn: config_1.GlobalConfig.Authentication.ExpiresIn
                });
                const refresh_token = this.jwtService.sign(user, {
                    secret: config_1.GlobalConfig.Authentication.ServerKeyRefresh,
                    expiresIn: config_1.GlobalConfig.Authentication.ExpiresInRefresh
                });
                this.updateRefreshTokenAuth(user.email, refresh_token);
                res.cookie('access-token', access_token, { expires: new Date(Date.now() + (30 * 24 * 3600000)), httpOnly: true });
                res.cookie('refresh-token', refresh_token, { expires: new Date(Date.now() + (30 * 24 * 3600000)), httpOnly: true });
                return {
                    user: user,
                    access_token: access_token,
                    refresh_token: refresh_token,
                    permissions: this.listPermissions
                };
            }
            catch (_a) {
                throw new common_1.HttpException({ status: "error", message: 'Email Or Password Invalid !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    logout(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userService.updateRefreshTokenUser(email, null);
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    updateRefreshTokenAuth(email, refreshToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.updateRefreshTokenUser(email, refreshToken);
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    refreshTokens(email, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.listPermissions = [];
            try {
                const getUser = yield this.userModel.findOne({ 'Email': email });
                getUser.Role.Permissions.forEach(permission => {
                    this.listPermissions.push(Object.values(permission)[0]);
                });
                if (!getUser || !getUser.RefreshToken) {
                    throw new common_1.ForbiddenException('Access Denid');
                }
                const user = {
                    display_name: getUser.DisplayName,
                    email: getUser.Email,
                    phone: getUser.Phone,
                    address: getUser.Address,
                    updated_at: getUser.UpdatedAt,
                    permissions: this.listPermissions,
                    avatar_url: getUser.AvatarUrl
                };
                const access_token = this.jwtService.sign(user, {
                    secret: config_1.GlobalConfig.Authentication.ServerKey,
                    expiresIn: config_1.GlobalConfig.Authentication.ExpiresIn
                });
                const refresh_token = this.jwtService.sign(user, {
                    secret: config_1.GlobalConfig.Authentication.ServerKeyRefresh,
                    expiresIn: config_1.GlobalConfig.Authentication.ExpiresInRefresh
                });
                res.cookie('access-token', access_token, { expires: new Date(Date.now() + 900000), httpOnly: true });
                res.cookie('refresh-token', refresh_token, { expires: new Date(Date.now() + 900000), httpOnly: true });
                yield this.updateRefreshTokenAuth(email, refresh_token);
                return { access_token, refresh_token, permissions: this.listPermissions };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    validateUserAndPassword(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findOne({ 'Email': email });
                if (!user) {
                    throw new common_1.UnauthorizedException();
                }
                return user;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(UserSchema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof UserService_1.UserService !== "undefined" && UserService_1.UserService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/auth/LoggingInterceptor.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operators_1 = __webpack_require__("rxjs/operators");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const httpCode = context.switchToHttp().getResponse().statusCode;
        return next
            .handle()
            .pipe((0, operators_1.tap)(() => {
        }));
    }
};
LoggingInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;


/***/ }),

/***/ "./src/app/auth/decorator/RolesDecorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequirePermission = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const RequirePermission = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.RequirePermission = RequirePermission;


/***/ }),

/***/ "./src/app/auth/guard/RolesGuard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const config_1 = __webpack_require__("./src/config.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
const mongoose_2 = __webpack_require__("mongoose");
let RolesGuard = class RolesGuard {
    constructor(userModel, reflector, jwtService) {
        this.userModel = userModel;
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const requiredPermission = this.reflector.getAllAndOverride('roles', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredPermission) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            this.listPermissions = [];
            try {
                const payload = yield this.jwtService.verifyAsync(token, {
                    secret: config_1.GlobalConfig.Authentication.ServerKey
                });
                request.user = payload;
                const users = yield this.userModel.findOne({ 'Email': request.user['email'] });
                users.Role.Permissions.forEach(permission => {
                    this.listPermissions.push(Object.values(permission)[0]);
                });
            }
            catch (_a) {
                throw new common_1.UnauthorizedException();
            }
            return requiredPermission.some((permission) => this.listPermissions.includes(permission));
        });
    }
    extractTokenFromHeader(request) {
        var _a;
        try {
            const [type, token] = (_a = request.headers['authorization'].split(' ')) !== null && _a !== void 0 ? _a : [];
            return type === 'Bearer' ? token : undefined;
        }
        catch (error) {
            common_1.Logger.error(error);
        }
    }
};
RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),

/***/ "./src/app/auth/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/auth/AuthModule.ts"), exports);


/***/ }),

/***/ "./src/app/auth/strategy/AccessTokenStrategy .ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessTokenStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const config_1 = __webpack_require__("./src/config.ts");
const AuthService_1 = __webpack_require__("./src/app/auth/AuthService.ts");
let AccessTokenStrategy = class AccessTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-access') {
    constructor(authService) {
        super({
            secretOrKey: config_1.GlobalConfig.Authentication.ServerKey,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([(request) => {
                    let data = request.cookies["access-token"];
                    if (!data) {
                        return null;
                    }
                    return data;
                }])
        });
        this.authService = authService;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.validateUserAndPassword(payload.email);
                if (payload === null) {
                    throw new common_1.UnauthorizedException("Invalid Token");
                }
                return user;
            }
            catch (_a) {
                common_1.Logger.error(this.error);
            }
        });
    }
};
AccessTokenStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof AuthService_1.AuthService !== "undefined" && AuthService_1.AuthService) === "function" ? _a : Object])
], AccessTokenStrategy);
exports.AccessTokenStrategy = AccessTokenStrategy;


/***/ }),

/***/ "./src/app/auth/strategy/JwtStrategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const AuthService_1 = __webpack_require__("./src/app/auth/AuthService.ts");
const config_1 = __webpack_require__("./src/config.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(authService) {
        super({
            ignoreExpiration: false,
            secretOrKey: config_1.GlobalConfig.Authentication.ServerKey,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([(request) => {
                    let data = request.cookies["access-token"];
                    if (!data) {
                        return null;
                    }
                    return data;
                }])
        });
        this.authService = authService;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUserAndPassword(payload.email);
            if (payload === null) {
                throw new common_1.UnauthorizedException("Invalid Token");
            }
            return user;
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof AuthService_1.AuthService !== "undefined" && AuthService_1.AuthService) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/app/auth/strategy/RefreshTokenStrategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("./src/config.ts");
const AuthService_1 = __webpack_require__("./src/app/auth/AuthService.ts");
let RefreshTokenStrategy = class RefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(authService) {
        super({
            secretOrKey: config_1.GlobalConfig.Authentication.ServerKeyRefresh,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([(request) => {
                    let data = request.cookies["refresh-token"];
                    if (!data) {
                        return null;
                    }
                    return data;
                }])
        });
        this.authService = authService;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authService.validateUserAndPassword(payload.email);
                if (payload === null) {
                    throw new common_1.UnauthorizedException("Invalid Token");
                }
                return user;
            }
            catch (_a) {
                common_1.Logger.error(this.error);
            }
        });
    }
};
RefreshTokenStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof AuthService_1.AuthService !== "undefined" && AuthService_1.AuthService) === "function" ? _a : Object])
], RefreshTokenStrategy);
exports.RefreshTokenStrategy = RefreshTokenStrategy;


/***/ }),

/***/ "./src/app/modules/banners/BannerController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const BannerService_1 = __webpack_require__("./src/app/modules/banners/BannerService.ts");
const api_interfaces_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/index.ts");
const utils_1 = __webpack_require__("./src/app/utils/index.ts");
const RolesDecorator_1 = __webpack_require__("./src/app/auth/decorator/RolesDecorator.ts");
const RolesGuard_1 = __webpack_require__("./src/app/auth/guard/RolesGuard.ts");
const Enum_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/Enum.ts");
let BannerController = class BannerController {
    constructor(bannerService) {
        this.bannerService = bannerService;
    }
    find(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { _keyword } = payload;
            const { page, limit } = utils_1.PaginationUtil.parseFromDTO(payload);
            const result = yield this.bannerService.find(payload);
            return utils_1.PaginationUtil.transformToPaginationResult(result.result, page, limit, result._total);
        });
    }
    findOne(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.bannerService.findOne(payload.id);
        });
    }
    ;
    create(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.bannerService.create({
                banner_name: payload.banner_name,
                banner_paragraph: payload.banner_paragraph,
                banner_image_url: payload.banner_image_url,
                pin_top: payload.pin_top,
                created_by: payload.created_by
            });
        });
    }
    update(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.bannerService.update({
                id: payload.id,
                banner_name: payload.banner_name,
                banner_paragraph: payload.banner_paragraph,
                banner_image_url: payload.banner_image_url,
                pin_top: payload.pin_top,
                updated_by: payload.updated_by
            });
        });
    }
    delete(idBanner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.bannerService.delete(idBanner.id);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.BANNER_VIEW),
    (0, common_1.Get)(api_interfaces_1.BannerEndpoints.Find),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof api_interfaces_1.Banner_FindDTO !== "undefined" && api_interfaces_1.Banner_FindDTO) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], BannerController.prototype, "find", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.BANNER_VIEW),
    (0, common_1.Get)(api_interfaces_1.BannerEndpoints.FindOne),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof api_interfaces_1.Banner_FindOneDTO !== "undefined" && api_interfaces_1.Banner_FindOneDTO) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], BannerController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.BANNER_CREATE),
    (0, common_1.Post)(api_interfaces_1.BannerEndpoints.Create),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof api_interfaces_1.Banner_UpsertDTO !== "undefined" && api_interfaces_1.Banner_UpsertDTO) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], BannerController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.BANNER_UPDATE),
    (0, common_1.Put)(api_interfaces_1.BannerEndpoints.Update),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof api_interfaces_1.Banner_UpsertDTO !== "undefined" && api_interfaces_1.Banner_UpsertDTO) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], BannerController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.BANNER_DELETE),
    (0, common_1.Delete)(api_interfaces_1.BannerEndpoints.Delete),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof api_interfaces_1.Banner_DeleteDTO !== "undefined" && api_interfaces_1.Banner_DeleteDTO) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], BannerController.prototype, "delete", null);
BannerController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof BannerService_1.BannerService !== "undefined" && BannerService_1.BannerService) === "function" ? _a : Object])
], BannerController);
exports.BannerController = BannerController;


/***/ }),

/***/ "./src/app/modules/banners/BannerModule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const BannerController_1 = __webpack_require__("./src/app/modules/banners/BannerController.ts");
const bannerSchema_1 = __webpack_require__("./src/app/modules/banners/bannerSchema.ts");
const BannerService_1 = __webpack_require__("./src/app/modules/banners/BannerService.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const users_1 = __webpack_require__("./src/app/modules/users/index.ts");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
let BannerModule = class BannerModule {
};
BannerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            users_1.UserModule,
            mongoose_1.MongooseModule.forFeature([{ name: bannerSchema_1.Banner.name, schema: bannerSchema_1.BannerSchema }, { name: UserSchema_1.User.name, schema: UserSchema_1.UserSchema }]),
        ],
        controllers: [BannerController_1.BannerController],
        providers: [BannerService_1.BannerService, jwt_1.JwtService],
        exports: [BannerService_1.BannerService]
    })
], BannerModule);
exports.BannerModule = BannerModule;


/***/ }),

/***/ "./src/app/modules/banners/BannerService.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const bannerSchema_1 = __webpack_require__("./src/app/modules/banners/bannerSchema.ts");
const mongoose_2 = __webpack_require__("mongoose");
let BannerService = class BannerService {
    constructor(bannerModel) {
        this.bannerModel = bannerModel;
    }
    find(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { _page, _limit, _keyword } = dto;
                const regex = new RegExp([".*", _keyword, ".*"].join(""), "i");
                const conditions = _keyword ? {
                    $and: [
                        {
                            $or: [
                                { BannerName: regex }
                            ]
                        },
                        { IsDeleted: false }
                    ]
                } : null;
                const totals = yield this.bannerModel.count(conditions ? conditions : { IsDeleted: false });
                const raw_data = yield this.bannerModel.find(conditions ? conditions : { IsDeleted: false }).sort({ CreatedAt: -1 }).skip((_page - 1) * _limit).limit(_limit).exec();
                const users = raw_data.map((user_data) => ({
                    id: user_data._id.toString(),
                    banner_name: user_data.BannerName,
                    banner_paragraph: user_data.BannerParagraph,
                    banner_image_url: user_data.BannerImageURL,
                    pin_top: user_data.Pintop,
                    updated_at: user_data.UpdatedAt,
                }));
                return {
                    result: users,
                    _total: totals,
                    _page: _page,
                    _limit: _limit,
                    _total_page: totals / _limit,
                    _next_page: _page + 1,
                    _prev_page: _page - 1
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const bannerDetail = yield this.bannerModel.findById(new mongoose_2.Types.ObjectId(id));
                return {
                    id: bannerDetail._id.toString(),
                    banner_name: bannerDetail.BannerName,
                    banner_paragraph: bannerDetail.BannerParagraph,
                    banner_image_url: bannerDetail.BannerImageURL,
                    pin_top: bannerDetail.Pintop,
                    created_at: bannerDetail.CreatedAt,
                    created_by: bannerDetail.CreatedBy,
                    updated_by: bannerDetail.UpdateBy,
                    updated_at: bannerDetail.UpdatedAt
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    create(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const entity = {
                    _id: new mongoose_2.Types.ObjectId(dto.id),
                    BannerName: dto.banner_name,
                    BannerParagraph: dto.banner_paragraph,
                    BannerImageURL: dto.banner_image_url,
                    Pintop: dto.pin_top,
                    CreatedAt: new Date(),
                    CreatedBy: dto.created_by,
                    UpdatedAt: new Date(),
                    UpdateBy: dto.updated_by,
                    IsDeleted: dto.is_deleted,
                };
                yield new this.bannerModel(entity).save();
                return {
                    status: "success",
                    message: "Create User Successfuly ",
                    title: "Success"
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    update(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const bannerUpdate = yield this.findOne(dto.id);
                const entity = {
                    _id: new mongoose_2.Types.ObjectId(bannerUpdate.id),
                    BannerName: dto.banner_name,
                    BannerParagraph: dto.banner_paragraph,
                    BannerImageURL: dto.banner_image_url,
                    Pintop: dto.pin_top,
                    CreatedAt: dto.created_at,
                    UpdatedAt: new Date(),
                    CreatedBy: dto.created_by,
                    UpdateBy: dto.updated_by,
                    IsDeleted: dto.is_deleted
                };
                yield this.bannerModel.updateOne({ _id: new mongoose_2.Types.ObjectId(entity._id) }, { $set: entity });
                return {
                    status: "success",
                    message: "Create User Successfuly ",
                    title: "Succes"
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.bannerModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(id) }, { $set: { IsDeleted: true } });
                return {
                    status: "success",
                    message: "Delete Banner Successfully",
                    title: "Succes"
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
};
BannerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(bannerSchema_1.Banner.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], BannerService);
exports.BannerService = BannerService;


/***/ }),

/***/ "./src/app/modules/banners/bannerSchema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerSchema = exports.Banner = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Banner = class Banner {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Banner.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "BannerName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "BannerParagraph", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "BannerImageURL", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Banner.prototype, "Pintop", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Banner.prototype, "CreatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "CreatedBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Banner.prototype, "UpdatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Banner.prototype, "UpdateBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Banner.prototype, "IsDeleted", void 0);
Banner = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Banner);
exports.Banner = Banner;
exports.BannerSchema = mongoose_1.SchemaFactory.createForClass(Banner);


/***/ }),

/***/ "./src/app/modules/banners/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/banners/BannerModule.ts"), exports);


/***/ }),

/***/ "./src/app/modules/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/roles/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/users/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/banners/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/products/index.ts"), exports);


/***/ }),

/***/ "./src/app/modules/news/NewsController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const NewsService_1 = __webpack_require__("./src/app/modules/news/NewsService.ts");
const api_interfaces_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/index.ts");
const utils_1 = __webpack_require__("./src/app/utils/index.ts");
const RolesDecorator_1 = __webpack_require__("./src/app/auth/decorator/RolesDecorator.ts");
const RolesGuard_1 = __webpack_require__("./src/app/auth/guard/RolesGuard.ts");
const Enum_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/Enum.ts");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    ;
    find(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { _keyword: keyword } = payload;
            const { page, limit } = utils_1.PaginationUtil.parseFromDTO(payload);
            if ((payload._sortField === 'null') && (payload._filterField === 'null')) {
                const result = yield this.newsService.find(payload);
                return utils_1.PaginationUtil.transformToPaginationResult(result.result, page, limit, result._total);
            }
            if (payload._sortField) {
                const result = yield this.newsService.findWithSort(payload);
                return utils_1.PaginationUtil.transformToPaginationResult(result.result, page, limit, result._total);
            }
            if (payload._filterField) {
                const result = yield this.newsService.findWithFilter(payload);
                return utils_1.PaginationUtil.transformToPaginationResult(result.result, page, limit, result._total);
            }
        });
    }
    ;
    // @UseGuards(RolesGuard)
    // @RequirePermission(Permission.NEWS_VIEW)
    findOne(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.newsService.findOne(payload.id);
        });
    }
    ;
    create(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newsCreate = {
                title: payload.title,
                description: payload.description,
                rich_text_content: payload.rich_text_content,
                hash_tag: payload.hash_tag,
                image_cover_url: payload.image_cover_url,
                pinned_top: payload.pinned_top,
                created_at: payload.created_at,
                created_by: payload.created_by,
                updated_at: payload.updated_at,
                updated_by: payload.updated_by,
            };
            return yield this.newsService.create(newsCreate);
        });
    }
    ;
    update(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newsUpdate = {
                id: payload.id,
                title: payload.title,
                description: payload.description,
                rich_text_content: payload.rich_text_content,
                hash_tag: payload.hash_tag,
                image_cover_url: payload.image_cover_url,
                pinned_top: payload.pinned_top,
                created_at: payload.created_at,
                created_by: payload.created_by,
                updated_at: payload.updated_at,
                updated_by: payload.updated_by,
            };
            return yield this.newsService.update(newsUpdate);
        });
    }
    ;
    delete(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.newsService.delete(payload.id);
        });
    }
    ;
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.NEWS_VIEW),
    (0, common_1.Get)(api_interfaces_1.NewsEndpoints.Find),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof api_interfaces_1.News_FindDTO !== "undefined" && api_interfaces_1.News_FindDTO) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], NewsController.prototype, "find", null);
tslib_1.__decorate([
    (0, common_1.Get)(api_interfaces_1.NewsEndpoints.FindOne),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof api_interfaces_1.News_FindOneDTO !== "undefined" && api_interfaces_1.News_FindOneDTO) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], NewsController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.NEWS_CREATE),
    (0, common_1.Post)(api_interfaces_1.NewsEndpoints.Create),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof api_interfaces_1.News_UpsertDTO !== "undefined" && api_interfaces_1.News_UpsertDTO) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], NewsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.NEWS_UPDATE),
    (0, common_1.Put)(api_interfaces_1.NewsEndpoints.Update),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof api_interfaces_1.News_UpsertDTO !== "undefined" && api_interfaces_1.News_UpsertDTO) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], NewsController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.NEWS_DELETE),
    (0, common_1.Delete)(api_interfaces_1.NewsEndpoints.Delete),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof api_interfaces_1.News_DeleteDTO !== "undefined" && api_interfaces_1.News_DeleteDTO) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], NewsController.prototype, "delete", null);
NewsController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof NewsService_1.NewsService !== "undefined" && NewsService_1.NewsService) === "function" ? _a : Object])
], NewsController);
exports.NewsController = NewsController;


/***/ }),

/***/ "./src/app/modules/news/NewsModule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const NewsController_1 = __webpack_require__("./src/app/modules/news/NewsController.ts");
const NewsSchema_1 = __webpack_require__("./src/app/modules/news/NewsSchema.ts");
const NewsService_1 = __webpack_require__("./src/app/modules/news/NewsService.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
let NewsModule = class NewsModule {
};
NewsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: NewsSchema_1.News.name, schema: NewsSchema_1.NewsSchema }, { name: UserSchema_1.User.name, schema: UserSchema_1.UserSchema }]),
        ],
        controllers: [NewsController_1.NewsController],
        providers: [NewsService_1.NewsService, jwt_1.JwtService],
        exports: [NewsService_1.NewsService],
    })
], NewsModule);
exports.NewsModule = NewsModule;


/***/ }),

/***/ "./src/app/modules/news/NewsSchema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsSchema = exports.News = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let News = class News {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], News.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], News.prototype, "Title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], News.prototype, "Description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], News.prototype, "RichTextContent", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object)
], News.prototype, "HashTag", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], News.prototype, "ImageCoverUrl", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], News.prototype, "PinnedTop", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], News.prototype, "CreatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], News.prototype, "CreatedBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], News.prototype, "UpdatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], News.prototype, "UpdatedBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], News.prototype, "IsDeleted", void 0);
News = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], News);
exports.News = News;
exports.NewsSchema = mongoose_1.SchemaFactory.createForClass(News);


/***/ }),

/***/ "./src/app/modules/news/NewsService.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const NewsSchema_1 = __webpack_require__("./src/app/modules/news/NewsSchema.ts");
let NewsService = class NewsService {
    constructor(newsModel) {
        this.newsModel = newsModel;
    }
    ;
    find(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { _page, _limit, _keyword } = dto;
                const regex = new RegExp([".*", _keyword, ".*"].join(""), "i");
                const conditions = _keyword ? {
                    $and: [
                        {
                            Title: regex,
                        },
                        {
                            IsDeleted: false
                        },
                    ]
                } : null;
                const totals = yield this.newsModel.count(conditions ? conditions : { IsDeleted: false });
                let raw_data = yield this.newsModel.find(conditions ? conditions : { IsDeleted: false })
                    .sort({ PinnedTop: -1, UpdatedAt: -1 })
                    .skip((_page - 1) * _limit).limit(_limit).exec();
                const list_news = raw_data.map((news_data) => ({
                    id: news_data._id.toString(),
                    title: news_data.Title,
                    created_at: news_data.CreatedAt,
                    updated_at: news_data.UpdatedAt,
                    hash_tag: news_data.HashTag,
                    pinned_top: news_data.PinnedTop,
                    created_by: news_data.CreatedBy,
                }));
                return {
                    result: list_news,
                    _total: totals,
                    _page: _page,
                    _limit: _limit,
                    _total_page: totals / _limit,
                    _next_page: _page + 1,
                    _prev_page: _page - 1,
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const news_detail = yield this.newsModel.findById(new mongoose_2.Types.ObjectId(id));
                return {
                    id: news_detail._id.toString(),
                    title: news_detail.Title,
                    description: news_detail.Description,
                    rich_text_content: news_detail.RichTextContent,
                    image_cover_url: news_detail.ImageCoverUrl,
                    hash_tag: news_detail.HashTag,
                    pinned_top: news_detail.PinnedTop,
                    created_at: news_detail.CreatedAt,
                    updated_at: news_detail.UpdatedAt,
                    created_by: news_detail.CreatedBy,
                    updated_by: news_detail.UpdatedBy,
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    create(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (!dto.title) {
                    throw new common_1.HttpException({ status: "error", title: "Error", message: "Title not null" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!dto.description) {
                    throw new common_1.HttpException({ status: "error", title: "Error", message: "Description not null" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!dto.rich_text_content) {
                    throw new common_1.HttpException({ status: "error", title: "Error", message: "Rich text content not null" }, common_1.HttpStatus.BAD_REQUEST);
                }
                const news = {
                    _id: new mongoose_2.Types.ObjectId(),
                    Title: dto.title,
                    Description: dto.description,
                    RichTextContent: dto.rich_text_content,
                    ImageCoverUrl: dto.image_cover_url,
                    HashTag: dto.hash_tag,
                    PinnedTop: dto.pinned_top,
                    CreatedBy: dto.created_by,
                    CreatedAt: new Date(),
                    UpdatedAt: new Date(),
                    UpdatedBy: dto.updated_by,
                    IsDeleted: false
                };
                yield new this.newsModel(news).save();
                const message_response = {
                    status: "success",
                    title: "Succes",
                    message: "Create news successfully"
                };
                return message_response;
            }
            catch (error) {
            }
        });
    }
    ;
    update(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const news_old = yield this.findOne(dto.id);
                if (!dto.title) {
                    throw new common_1.HttpException({ status: "error", title: "Error", message: "Title not null" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!dto.description) {
                    throw new common_1.HttpException({ status: "error", title: "Error", message: "Description not null" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!dto.rich_text_content) {
                    throw new common_1.HttpException({ status: "error", title: "Error", message: "Rich text content not null" }, common_1.HttpStatus.BAD_REQUEST);
                }
                const news = {
                    _id: new mongoose_2.Types.ObjectId(news_old.id),
                    Title: dto.title,
                    Description: dto.description,
                    RichTextContent: dto.rich_text_content,
                    ImageCoverUrl: dto.image_cover_url,
                    HashTag: dto.hash_tag,
                    PinnedTop: dto.pinned_top,
                    CreatedBy: dto.created_by,
                    CreatedAt: dto.created_at,
                    UpdatedAt: new Date(),
                    UpdatedBy: dto.updated_by,
                    IsDeleted: false
                };
                yield this.newsModel.updateOne({ _id: news._id }, { $set: news });
                const message_response = {
                    status: "success",
                    title: "Succes",
                    message: "Update news successfully"
                };
                return message_response;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.newsModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(id) }, { IsDeleted: true });
                const message_response = {
                    status: "success",
                    title: "Succes",
                    message: "Delete news successfully"
                };
                return message_response;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    findWithSort(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { _page, _limit, _sortField, _sortOrder } = dto;
            try {
                const totals = yield this.newsModel.count({ IsDeleted: false });
                let raw_data = yield this.newsModel.find({ IsDeleted: false })
                    .sort(_sortField === 'CreatedAt' ? { CreatedAt: _sortOrder === 'ascend' ? -1 : 1 } :
                    _sortField === 'UpdatedAt' ? { UpdatedAt: _sortOrder === 'ascend' ? -1 : 1 } :
                        { PinnedTop: _sortOrder === 'ascend' ? -1 : 1 })
                    .skip((_page - 1) * _limit).limit(_limit).exec();
                const list_news = raw_data.map((news_data) => ({
                    id: news_data._id.toString(),
                    title: news_data.Title,
                    created_at: news_data.CreatedAt,
                    updated_at: news_data.UpdatedAt,
                    hash_tag: news_data.HashTag,
                    pinned_top: news_data.PinnedTop,
                    created_by: news_data.CreatedBy,
                }));
                return {
                    result: list_news,
                    _total: totals,
                    _page: _page,
                    _limit: _limit,
                    _total_page: totals / _limit,
                    _next_page: _page + 1,
                    _prev_page: _page - 1,
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    findWithFilter(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { _page, _limit, _filterField, _filterValue } = dto;
                let filters = {};
                if (_filterField !== 'HashTag') {
                    if (_filterField === "CreatedAt") {
                        filters = {
                            CreatedAt: {
                                $gte: `${_filterValue[0]}:00:00:00`,
                                $lt: `${_filterValue[1]}:23:59:59`,
                            },
                        };
                    }
                    if (_filterField === "UpdatedAt") {
                        filters = {
                            UpdatedAt: {
                                $gte: `${_filterValue[0]}:00:00:00`,
                                $lt: `${_filterValue[1]}:23:59:59`,
                            },
                        };
                    }
                    if (_filterField === "PinnedTop") {
                        if (_filterValue === "true") {
                            filters = {
                                PinnedTop: true
                            };
                        }
                        else {
                            if (_filterValue === "false") {
                                filters = {
                                    PinnedTop: false
                                };
                            }
                            else {
                                filters = {
                                    $or: [
                                        { PinnedTop: true },
                                        { PinnedTop: false },
                                    ]
                                };
                            }
                        }
                    }
                    const totals = yield this.newsModel.count({ IsDeleted: false }).where(filters);
                    let raw_data = yield this.newsModel.find({ IsDeleted: false }).where(filters)
                        .sort({ UpdatedAt: -1 })
                        .skip((_page - 1) * _limit).limit(_limit).exec();
                    const list_news = raw_data.map((news_data) => ({
                        id: news_data._id.toString(),
                        title: news_data.Title,
                        created_at: news_data.CreatedAt,
                        updated_at: news_data.UpdatedAt,
                        hash_tag: news_data.HashTag,
                        pinned_top: news_data.PinnedTop,
                        created_by: news_data.CreatedBy,
                    }));
                    return {
                        result: list_news,
                        _total: totals,
                        _page: _page,
                        _limit: _limit,
                        _total_page: totals / _limit,
                        _next_page: _page + 1,
                        _prev_page: _page - 1,
                    };
                }
                else {
                    const totals = yield this.newsModel.count({ IsDeleted: false, HashTag: { "$in": [new RegExp([".*", _filterValue, ".*"].join(""), "i")] } });
                    let raw_data = yield this.newsModel.find({ IsDeleted: false, HashTag: { "$in": [new RegExp([".*", _filterValue, ".*"].join(""), "i")] } })
                        .sort({ UpdatedAt: -1 })
                        .skip((_page - 1) * _limit).limit(_limit).exec();
                    const list_news = raw_data.map((news_data) => ({
                        id: news_data._id.toString(),
                        title: news_data.Title,
                        created_at: news_data.CreatedAt,
                        updated_at: news_data.UpdatedAt,
                        hash_tag: news_data.HashTag,
                        pinned_top: news_data.PinnedTop,
                        created_by: news_data.CreatedBy,
                    }));
                    return {
                        result: list_news,
                        _total: totals,
                        _page: _page,
                        _limit: _limit,
                        _total_page: totals / _limit,
                        _next_page: _page + 1,
                        _prev_page: _page - 1,
                    };
                }
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
};
NewsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(NewsSchema_1.News.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], NewsService);
exports.NewsService = NewsService;


/***/ }),

/***/ "./src/app/modules/news/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/news/NewsModule.ts"), exports);


/***/ }),

/***/ "./src/app/modules/products/ProductController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const ProductService_1 = __webpack_require__("./src/app/modules/products/ProductService.ts");
const api_interfaces_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/index.ts");
const utils_1 = __webpack_require__("./src/app/utils/index.ts");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    // @UseGuards(RolesGuard)
    // @RequirePermission(Permission.BANNER_VIEW)
    find(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { _keyword } = payload;
            const { page, limit } = utils_1.PaginationUtil.parseFromDTO(payload);
            const result = yield this.productService.find(payload);
            return utils_1.PaginationUtil.transformToPaginationResult(result.result, page, limit, result._total);
        });
    }
    // @UseGuards(RolesGuard)
    // @RequirePermission(Permission.BANNER_VIEW)
    findOne(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.findOne(payload.id);
        });
    }
    ;
    // @UseGuards(RolesGuard)
    // @RequirePermission(Permission.BANNER_CREATE)
    create(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.create({
                product_name: payload.product_name,
                product_density: payload.product_density,
                created_by: payload.created_by
            });
        });
    }
    // @UseGuards(RolesGuard)
    // @RequirePermission(Permission.BANNER_UPDATE)
    update(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.update({
                id: payload.id,
                product_name: payload.product_name,
                product_density: payload.product_density,
                created_by: payload.created_by,
                updated_by: payload.updated_by
            });
        });
    }
    // @UseGuards(RolesGuard)
    // @RequirePermission(Permission.BANNER_DELETE)
    delete(idBanner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.delete(idBanner.id);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(api_interfaces_1.ProductEndpoints.Find),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof api_interfaces_1.Product_FindDTO !== "undefined" && api_interfaces_1.Product_FindDTO) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProductController.prototype, "find", null);
tslib_1.__decorate([
    (0, common_1.Get)(api_interfaces_1.ProductEndpoints.FindOne),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof api_interfaces_1.Product_FindOneDTO !== "undefined" && api_interfaces_1.Product_FindOneDTO) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProductController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(api_interfaces_1.ProductEndpoints.Create),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof api_interfaces_1.Product_UpsertDTO !== "undefined" && api_interfaces_1.Product_UpsertDTO) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ProductController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(api_interfaces_1.ProductEndpoints.Update),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof api_interfaces_1.Product_UpsertDTO !== "undefined" && api_interfaces_1.Product_UpsertDTO) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ProductController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(api_interfaces_1.ProductEndpoints.Delete),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof api_interfaces_1.Product_DeleteDTO !== "undefined" && api_interfaces_1.Product_DeleteDTO) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ProductController.prototype, "delete", null);
ProductController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ProductService_1.ProductService !== "undefined" && ProductService_1.ProductService) === "function" ? _a : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ }),

/***/ "./src/app/modules/products/ProductModule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const users_1 = __webpack_require__("./src/app/modules/users/index.ts");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
const ProductSchema_1 = __webpack_require__("./src/app/modules/products/ProductSchema.ts");
const ProductController_1 = __webpack_require__("./src/app/modules/products/ProductController.ts");
const ProductService_1 = __webpack_require__("./src/app/modules/products/ProductService.ts");
let ProductModule = class ProductModule {
};
ProductModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            users_1.UserModule,
            mongoose_1.MongooseModule.forFeature([{ name: ProductSchema_1.Product.name, schema: ProductSchema_1.ProductSchema }, { name: UserSchema_1.User.name, schema: UserSchema_1.UserSchema }]),
        ],
        controllers: [ProductController_1.ProductController],
        providers: [ProductService_1.ProductService, jwt_1.JwtService],
        exports: [ProductService_1.ProductService]
    })
], ProductModule);
exports.ProductModule = ProductModule;


/***/ }),

/***/ "./src/app/modules/products/ProductSchema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = exports.Product = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Product = class Product {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Product.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "ProductName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "ProductDensity", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Product.prototype, "CreatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "CreatedBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Product.prototype, "UpdatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "UpdateBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Product.prototype, "IsDeleted", void 0);
Product = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),

/***/ "./src/app/modules/products/ProductService.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const ProductSchema_1 = __webpack_require__("./src/app/modules/products/ProductSchema.ts");
const mongoose_2 = __webpack_require__("mongoose");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    find(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { _page, _limit, _keyword } = dto;
                const regex = new RegExp([".*", _keyword, ".*"].join(""), "i");
                const conditions = _keyword ? {
                    $and: [
                        {
                            $or: [
                                { ProductName: regex }
                            ]
                        },
                        { IsDeleted: false }
                    ]
                } : null;
                const totals = yield this.productModel.count(conditions ? conditions : { IsDeleted: false });
                const raw_data = yield this.productModel.find(conditions ? conditions : { IsDeleted: false }).sort({ CreatedAt: -1 }).skip((_page - 1) * _limit).limit(_limit).exec();
                const users = raw_data.map((user_data) => ({
                    id: user_data._id.toString(),
                    product_name: user_data.ProductName,
                    product_density: user_data.ProductDensity,
                    updated_at: user_data.UpdatedAt,
                }));
                return {
                    result: users,
                    _total: totals,
                    _page: _page,
                    _limit: _limit,
                    _total_page: totals / _limit,
                    _next_page: _page + 1,
                    _prev_page: _page - 1
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const productDetail = yield this.productModel.findById(new mongoose_2.Types.ObjectId(id));
                return {
                    id: productDetail._id.toString(),
                    product_name: productDetail.ProductName,
                    product_density: productDetail.ProductDensity,
                    created_at: productDetail.CreatedAt,
                    created_by: productDetail.CreatedBy,
                    updated_by: productDetail.UpdateBy,
                    updated_at: productDetail.UpdatedAt
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    create(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const entity = {
                    _id: new mongoose_2.Types.ObjectId(dto.id),
                    ProductName: dto.product_name,
                    ProductDensity: dto.product_density,
                    CreatedAt: new Date(),
                    CreatedBy: dto.created_by,
                    UpdatedAt: new Date(),
                    UpdateBy: dto.updated_by,
                    IsDeleted: dto.is_deleted,
                };
                yield new this.productModel(entity).save();
                return {
                    status: "success",
                    message: "Create Product Successfuly ",
                    title: "Success"
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    update(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const productUpdate = yield this.findOne(dto.id);
                const entity = {
                    _id: new mongoose_2.Types.ObjectId(productUpdate.id),
                    ProductName: dto.product_name,
                    ProductDensity: dto.product_density,
                    CreatedAt: new Date(),
                    CreatedBy: dto.created_by,
                    UpdatedAt: new Date(),
                    UpdateBy: dto.updated_by,
                    IsDeleted: dto.is_deleted,
                };
                yield this.productModel.updateOne({ _id: new mongoose_2.Types.ObjectId(entity._id) }, { $set: entity });
                return {
                    status: "success",
                    message: "Create Product Successfuly ",
                    title: "Succes"
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(id) }, { $set: { IsDeleted: true } });
                return {
                    status: "success",
                    message: "Delete Product Successfully",
                    title: "Succes"
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
};
ProductService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(ProductSchema_1.Product.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ }),

/***/ "./src/app/modules/products/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/products/ProductModule.ts"), exports);


/***/ }),

/***/ "./src/app/modules/roles/RoleController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleController = void 0;
const tslib_1 = __webpack_require__("tslib");
const api_interfaces_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const RoleService_1 = __webpack_require__("./src/app/modules/roles/RoleService.ts");
const RolesGuard_1 = __webpack_require__("./src/app/auth/guard/RolesGuard.ts");
const RolesDecorator_1 = __webpack_require__("./src/app/auth/decorator/RolesDecorator.ts");
const Enum_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/Enum.ts");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    ;
    find() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.roleService.find();
        });
    }
    ;
    findOne(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(payload.id);
            return yield this.roleService.findOne(payload.id);
        });
    }
    ;
    findPrmissionOfUserByEmail(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.roleService.findPermissionByEmailUser(payload.email);
        });
    }
    ;
    create(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(payload);
            return yield this.roleService.create({
                id: payload.id,
                name: payload.name,
                permissions: payload.permissions,
                created_at: payload.created_at,
                created_by: payload.created_by,
                updated_at: payload.updated_at,
                updated_by: payload.updated_by
            });
        });
    }
    ;
    update(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.roleService.update(payload);
        });
    }
    ;
    delete(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.roleService.delete(query.id);
        });
    }
    ;
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.ROLE_VIEW),
    (0, common_1.Get)(api_interfaces_1.RoleEndpoints.Find),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], RoleController.prototype, "find", null);
tslib_1.__decorate([
    (0, common_1.Get)(api_interfaces_1.RoleEndpoints.FindOne),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof api_interfaces_1.Role_FindOneDTO !== "undefined" && api_interfaces_1.Role_FindOneDTO) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RoleController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Get)(api_interfaces_1.RoleEndpoints.FindPermissionOfUserByEmail),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof api_interfaces_1.Role_FindPermissionOfUserDTO !== "undefined" && api_interfaces_1.Role_FindPermissionOfUserDTO) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], RoleController.prototype, "findPrmissionOfUserByEmail", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.ROLE_CREATE),
    (0, common_1.Post)(api_interfaces_1.RoleEndpoints.Create),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof api_interfaces_1.Role_CreateDTO !== "undefined" && api_interfaces_1.Role_CreateDTO) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], RoleController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.ROLE_UPDATE),
    (0, common_1.Put)(api_interfaces_1.RoleEndpoints.Update),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof api_interfaces_1.Role_UpdateDTO !== "undefined" && api_interfaces_1.Role_UpdateDTO) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], RoleController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.ROLE_DELETE),
    (0, common_1.Delete)(api_interfaces_1.RoleEndpoints.Delete),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof api_interfaces_1.Role_deleteDTO !== "undefined" && api_interfaces_1.Role_deleteDTO) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], RoleController.prototype, "delete", null);
RoleController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof RoleService_1.RoleService !== "undefined" && RoleService_1.RoleService) === "function" ? _a : Object])
], RoleController);
exports.RoleController = RoleController;


/***/ }),

/***/ "./src/app/modules/roles/RoleModule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const RoleController_1 = __webpack_require__("./src/app/modules/roles/RoleController.ts");
const RoleSchema_1 = __webpack_require__("./src/app/modules/roles/RoleSchema.ts");
const RoleService_1 = __webpack_require__("./src/app/modules/roles/RoleService.ts");
const users_1 = __webpack_require__("./src/app/modules/users/index.ts");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
let RoleModule = class RoleModule {
};
RoleModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            users_1.UserModule,
            mongoose_1.MongooseModule.forFeature([{ name: UserSchema_1.User.name, schema: UserSchema_1.UserSchema }, { name: RoleSchema_1.Role.name, schema: RoleSchema_1.RoleSchema }]),
        ],
        controllers: [RoleController_1.RoleController],
        providers: [RoleService_1.RoleService, jwt_1.JwtService,],
        exports: [RoleService_1.RoleService],
    })
], RoleModule);
exports.RoleModule = RoleModule;


/***/ }),

/***/ "./src/app/modules/roles/RoleSchema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleSchema = exports.Role = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let Role = class Role {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "Name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object)
], Role.prototype, "Permissions", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Role.prototype, "CreatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "CreatedBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Role.prototype, "UpdatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "UpdatedBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Role.prototype, "IsDeleted", void 0);
Role = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Role);
exports.Role = Role;
exports.RoleSchema = mongoose_1.SchemaFactory.createForClass(Role);


/***/ }),

/***/ "./src/app/modules/roles/RoleService.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const RoleSchema_1 = __webpack_require__("./src/app/modules/roles/RoleSchema.ts");
const RolePermissions_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/modules/roles/RolePermissions.ts");
const UserService_1 = __webpack_require__("./src/app/modules/users/UserService.ts");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
let RoleService = class RoleService {
    constructor(roleModel, userService, userModel) {
        this.roleModel = roleModel;
        this.userService = userService;
        this.userModel = userModel;
    }
    ;
    find() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.roleModel.find({ IsDeleted: false });
                const result = data.map((role_data) => ({
                    id: role_data._id,
                    name: role_data.Name,
                    permissions: role_data.Permissions,
                    created_at: role_data.CreatedAt,
                    created_by: role_data.CreatedBy,
                    updated_at: role_data.UpdatedAt,
                    updated_by: role_data.UpdatedBy,
                }));
                return result;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    findOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const role_data = yield this.roleModel.findById({ _id: id }, { IsDeleted: false });
                return {
                    id: role_data._id,
                    name: role_data.Name,
                    permissions: role_data.Permissions,
                    created_at: role_data.CreatedAt,
                    created_by: role_data.CreatedBy,
                    updated_at: role_data.UpdatedAt,
                    updated_by: role_data.UpdatedBy,
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    findPermissionByEmailUser(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let listPermissionsOfUser = [];
                const user = yield this.userModel.findOne({ Email: email });
                const roleOfUser = yield this.roleModel.findById({ _id: user.Role._id }, { IsDeleted: false });
                roleOfUser.Permissions.forEach(permission => {
                    listPermissionsOfUser.push(Object.values(permission)[0]);
                });
                return listPermissionsOfUser;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    create(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const checkIdRole = yield this.roleModel.exists({ _id: dto.id });
                const checkNameRole = yield this.roleModel.exists({ Name: dto.name });
                if (checkIdRole) {
                    throw new common_1.HttpException({ status: "error", message: 'Role id already exists', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (checkNameRole) {
                    throw new common_1.HttpException({ status: "error", message: 'Role name already exists', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                const role = {
                    _id: dto.id,
                    Name: dto.name,
                    Permissions: dto.permissions,
                    CreatedAt: new Date(),
                    CreatedBy: dto.created_by,
                    UpdatedAt: new Date(),
                    UpdatedBy: null,
                    IsDeleted: false,
                };
                yield new this.roleModel(role).save();
                const message_response = {
                    status: "success",
                    title: "Succes",
                    message: "Create role successfully"
                };
                return message_response;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    update(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const currentRole = yield this.findOne(dto.id);
                const arrayPermissions = currentRole.permissions;
                const permission = '@Permission/' + dto.module + '/' + dto.permission;
                for (let i = 0; i < RolePermissions_1.APP_CONSTANT_PERMISSIONS.length; i++) {
                    if (RolePermissions_1.APP_CONSTANT_PERMISSIONS[i].id === permission) {
                        if (dto.action) {
                            arrayPermissions.push(RolePermissions_1.APP_CONSTANT_PERMISSIONS[i]);
                        }
                        else {
                            const array = arrayPermissions.map((item) => ({
                                id: item.id,
                                name: item.name,
                            }));
                            arrayPermissions.splice(array.map(item => item.id).indexOf(RolePermissions_1.APP_CONSTANT_PERMISSIONS[i].id), 1);
                        }
                    }
                }
                const role = {
                    _id: currentRole.id,
                    Name: currentRole.name,
                    Permissions: arrayPermissions,
                    CreatedAt: currentRole.created_at,
                    CreatedBy: currentRole.created_by,
                    UpdatedAt: new Date(),
                    UpdatedBy: currentRole.updated_by,
                    IsDeleted: false
                };
                this.userService.updateRoleInUser(role.Name, role);
                yield this.roleModel.updateOne({ _id: currentRole.id }, { $set: role });
                const message_response = {
                    status: "success",
                    title: "Succes",
                    message: "Update role successfully"
                };
                return message_response;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const currentRole = yield this.findOne(id);
                yield this.roleModel.findOneAndUpdate({ _id: id }, { IsDeleted: true });
                const message_response = {
                    status: "success",
                    title: "Succes",
                    message: "Delete role successfully"
                };
                return message_response;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    ;
};
RoleService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(RoleSchema_1.Role.name)),
    tslib_1.__param(2, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof UserService_1.UserService !== "undefined" && UserService_1.UserService) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object])
], RoleService);
exports.RoleService = RoleService;


/***/ }),

/***/ "./src/app/modules/roles/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/roles/RoleModule.ts"), exports);


/***/ }),

/***/ "./src/app/modules/upload/UploadController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadController = void 0;
const tslib_1 = __webpack_require__("tslib");
const api_interfaces_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const multer_1 = __webpack_require__("multer");
const path_1 = tslib_1.__importDefault(__webpack_require__("path"));
const UploadService_1 = __webpack_require__("./src/app/modules/upload/UploadService.ts");
const uuid_1 = __webpack_require__("uuid");
const pathFile_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/_shared/pathFile.ts");
const api_interfaces_2 = __webpack_require__("../../../libs/erp/api-interfaces/src/index.ts");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    findAllUpload() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.uploadService.findAll();
        });
    }
    uploadFile(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.uploadService.upload(file);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(api_interfaces_2.UploadEndpoints.Find),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UploadController.prototype, "findAllUpload", null);
tslib_1.__decorate([
    (0, common_1.Post)(`${api_interfaces_1.UserEndpoints.UploadFile}|${api_interfaces_1.NewsEndpoints.UploadFile}|${api_interfaces_1.BannerEndpoints.UploadFile}`),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('upload', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                let endpoint = req.originalUrl.split('api/').pop();
                let uploadPath = '';
                if (endpoint === api_interfaces_1.UserEndpoints.UploadFile) {
                    uploadPath = pathFile_1.PATH_FILE_AVATAR_UPLOAD;
                }
                else if (endpoint === api_interfaces_1.NewsEndpoints.UploadFile) {
                    uploadPath = pathFile_1.PATH_FILE_NEWS_UPLOAD;
                }
                else if (endpoint === api_interfaces_1.BannerEndpoints.UploadFile) {
                    uploadPath = pathFile_1.PATH_FILE_BANNER_UPLOAD;
                }
                else {
                    return cb(new common_1.BadRequestException('Invalid endpoint'), null);
                }
                cb(null, uploadPath);
            },
            filename: (req, upload, callback) => {
                const generator_name = ((0, uuid_1.v4)() + path_1.default.parse(upload.originalname).name.replace(/\s/g, '')).trim();
                const extension = path_1.default.parse(upload.originalname).ext;
                const name = (generator_name + extension).trim();
                callback(null, name);
            },
        }),
        limits: { fileSize: 1024 * 1024 * 2 },
        fileFilter(req, file, callback) {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    tslib_1.__param(0, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UploadController.prototype, "uploadFile", null);
UploadController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof UploadService_1.UploadService !== "undefined" && UploadService_1.UploadService) === "function" ? _a : Object])
], UploadController);
exports.UploadController = UploadController;


/***/ }),

/***/ "./src/app/modules/upload/UploadModule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UploadModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const UploadSchema_1 = __webpack_require__("./src/app/modules/upload/UploadSchema.ts");
const UploadController_1 = __webpack_require__("./src/app/modules/upload/UploadController.ts");
const UploadService_1 = __webpack_require__("./src/app/modules/upload/UploadService.ts");
let UploadModule = UploadModule_1 = class UploadModule {
};
UploadModule = UploadModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: UploadSchema_1.Upload.name, schema: UploadSchema_1.UploadSchema }]),
        ],
        controllers: [UploadController_1.UploadController],
        providers: [UploadModule_1, UploadService_1.UploadService],
        exports: [UploadService_1.UploadService, UploadModule_1],
    })
], UploadModule);
exports.UploadModule = UploadModule;


/***/ }),

/***/ "./src/app/modules/upload/UploadSchema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadSchema = exports.Upload = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Upload = class Upload {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Upload.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Upload.prototype, "OriginalName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Upload.prototype, "NewName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Upload.prototype, "CreatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Upload.prototype, "TypeFile", void 0);
Upload = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], Upload);
exports.Upload = Upload;
exports.UploadSchema = mongoose_1.SchemaFactory.createForClass(Upload);


/***/ }),

/***/ "./src/app/modules/upload/UploadService.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const UploadSchema_1 = __webpack_require__("./src/app/modules/upload/UploadSchema.ts");
let UploadService = class UploadService {
    constructor(uploadModel) {
        this.uploadModel = uploadModel;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const upload = yield this.uploadModel.find();
                const uploadFile = upload.map((fileUpload) => ({
                    original_name: fileUpload.OriginalName,
                    new_name: fileUpload.NewName,
                    created_at: fileUpload.CreatedAt,
                    type_file: fileUpload.TypeFile
                }));
                return uploadFile;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    upload(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const entity = {
                    _id: new mongoose_2.Types.ObjectId(),
                    OriginalName: file.originalname,
                    NewName: file.filename,
                    CreatedAt: new Date(),
                    TypeFile: file.mimetype
                };
                yield new this.uploadModel(entity).save();
                return ({ imageFileName: file.filename });
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UploadService.prototype, "upload", null);
UploadService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(UploadSchema_1.Upload.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UploadService);
exports.UploadService = UploadService;


/***/ }),

/***/ "./src/app/modules/users/UserController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const api_interfaces_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const utils_1 = __webpack_require__("./src/app/utils/index.ts");
const UserService_1 = __webpack_require__("./src/app/modules/users/UserService.ts");
const Enum_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/Enum.ts");
const RolesGuard_1 = __webpack_require__("./src/app/auth/guard/RolesGuard.ts");
const RolesDecorator_1 = __webpack_require__("./src/app/auth/decorator/RolesDecorator.ts");
const express_1 = __webpack_require__("express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    find(payload, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { _keyword: keyword } = payload;
            const { page, limit } = utils_1.PaginationUtil.parseFromDTO(payload);
            const result = yield this.userService.find(payload);
            return utils_1.PaginationUtil.transformToPaginationResult(result.result, page, limit, result._total);
        });
    }
    ;
    findOne(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.findOne(payload.email);
            return {
                display_name: result.display_name,
                first_name: result.first_name,
                last_name: result.last_name,
                middle_name: result.middle_name,
                email: result.email,
                date_of_birth: result.date_of_birth,
                address: result.address,
                phone: result.phone,
                avatar_url: result.avatar_url,
                created_at: result.created_at,
                updated_at: result.updated_at,
                created_by: result.created_by,
                updated_by: result.updated_by,
                role: result.role,
            };
        });
    }
    ;
    create(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.create({
                display_name: payload.display_name,
                first_name: payload.first_name,
                last_name: payload.last_name,
                middle_name: payload.middle_name,
                email: payload.email,
                date_of_birth: payload.date_of_birth,
                address: payload.address,
                phone: payload.phone,
                avatar_url: payload.avatar_url,
                role: payload.role,
                password: payload.password,
                created_at: payload.created_at,
                updated_at: payload.updated_at,
                created_by: payload.created_by,
            });
        });
    }
    ;
    update(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.update({
                id: payload.id,
                display_name: payload.display_name,
                first_name: payload.first_name,
                last_name: payload.last_name,
                middle_name: payload.middle_name,
                email: payload.email,
                date_of_birth: payload.date_of_birth,
                password: payload.password,
                address: payload.address,
                phone: payload.phone,
                role: payload.role,
                avatar_url: payload.avatar_url,
                created_at: payload.created_at,
                updated_at: payload.updated_at,
                updated_by: payload.updated_by,
            });
        });
    }
    ;
    delete(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.delete(query.email);
        });
    }
    ;
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.USER_VIEW),
    (0, common_1.Get)(api_interfaces_1.UserEndpoints.Find),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof api_interfaces_1.User_FindDTO !== "undefined" && api_interfaces_1.User_FindDTO) === "function" ? _b : Object, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "find", null);
tslib_1.__decorate([
    (0, common_1.Get)(api_interfaces_1.UserEndpoints.FindOne),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof api_interfaces_1.User_FindOneDTO !== "undefined" && api_interfaces_1.User_FindOneDTO) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.USER_CREATE),
    (0, common_1.Post)(api_interfaces_1.UserEndpoints.Create),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof api_interfaces_1.User_UpsertDTO !== "undefined" && api_interfaces_1.User_UpsertDTO) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.USER_UPDATE),
    (0, common_1.Put)(api_interfaces_1.UserEndpoints.Update),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof api_interfaces_1.User_UpsertDTO !== "undefined" && api_interfaces_1.User_UpsertDTO) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(RolesGuard_1.RolesGuard),
    (0, RolesDecorator_1.RequirePermission)(Enum_1.Permission.USER_DELETE),
    (0, common_1.Delete)(api_interfaces_1.UserEndpoints.Delete),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof api_interfaces_1.User_DeleteDTO !== "undefined" && api_interfaces_1.User_DeleteDTO) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], UserController.prototype, "delete", null);
UserController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof UserService_1.UserService !== "undefined" && UserService_1.UserService) === "function" ? _a : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./src/app/modules/users/UserModule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const UserController_1 = __webpack_require__("./src/app/modules/users/UserController.ts");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
const UserService_1 = __webpack_require__("./src/app/modules/users/UserService.ts");
const RoleSchema_1 = __webpack_require__("./src/app/modules/roles/RoleSchema.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const AuthService_1 = __webpack_require__("./src/app/auth/AuthService.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: UserSchema_1.User.name, schema: UserSchema_1.UserSchema }, { name: RoleSchema_1.Role.name, schema: RoleSchema_1.RoleSchema }]),
        ],
        controllers: [UserController_1.UserController],
        providers: [UserService_1.UserService, jwt_1.JwtService, AuthService_1.AuthService],
        exports: [UserService_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./src/app/modules/users/UserSchema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const RoleSchema_1 = __webpack_require__("./src/app/modules/roles/RoleSchema.ts");
let User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], User.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "DisplayName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "FristName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "LastName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "MiddleName", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "DateOfBirth", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "Address", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "Phone", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "AvatarUrl", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "CreatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], User.prototype, "UpdatedAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "Email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "Password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof RoleSchema_1.Role !== "undefined" && RoleSchema_1.Role) === "function" ? _e : Object)
], User.prototype, "Role", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "IsDeleted", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "CreatedBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "UpdatedBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "RefreshToken", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./src/app/modules/users/UserService.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const UserSchema_1 = __webpack_require__("./src/app/modules/users/UserSchema.ts");
const bcrypt_1 = tslib_1.__importDefault(__webpack_require__("bcrypt"));
const pathFile_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/_shared/pathFile.ts");
const ValidateUtil_1 = __webpack_require__("./src/app/utils/ValidateUtil.ts");
const RoleSchema_1 = __webpack_require__("./src/app/modules/roles/RoleSchema.ts");
let UserService = class UserService {
    constructor(userModel, roleModel) {
        this.userModel = userModel;
        this.roleModel = roleModel;
    }
    find(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { _page, _limit, _keyword } = dto;
                const regex = new RegExp([".*", _keyword, ".*"].join(""), "i");
                const conditions = _keyword ? {
                    $and: [
                        {
                            $or: [
                                { Email: regex },
                                { DisplayName: regex },
                                { Phone: new RegExp(_keyword) }
                            ]
                        },
                        { IsDeleted: false }
                    ]
                } : null;
                const totals = yield this.userModel.count(conditions ? conditions : { IsDeleted: false });
                const raw_data = yield this.userModel.find(conditions ? conditions : { IsDeleted: false }).skip((_page - 1) * _limit).limit(_limit).exec();
                const users = raw_data.map((user_data) => ({
                    id: user_data._id.toString(),
                    display_name: user_data.DisplayName,
                    first_name: user_data.FristName,
                    last_name: user_data.LastName,
                    middle_name: user_data.MiddleName,
                    email: user_data.Email,
                    date_of_birth: user_data.DateOfBirth,
                    address: user_data.Address,
                    phone: user_data.Phone,
                    avatar_url: user_data.AvatarUrl,
                    created_at: user_data.CreatedAt,
                    updated_at: user_data.UpdatedAt,
                    created_by: user_data.CreatedBy,
                    isDeleted: user_data.IsDeleted,
                }));
                return {
                    result: users,
                    _total: totals,
                    _page: _page,
                    _limit: _limit,
                    _total_page: totals / _limit,
                    _next_page: _page + 1,
                    _prev_page: _page - 1
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    findOne(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userDetail = yield this.userModel.findOne({ 'Email': email });
                return {
                    id: userDetail._id.toString(),
                    display_name: userDetail.DisplayName,
                    first_name: userDetail.FristName,
                    last_name: userDetail.LastName,
                    middle_name: userDetail.MiddleName,
                    email: userDetail.Email,
                    date_of_birth: userDetail.DateOfBirth,
                    address: userDetail.Address,
                    phone: userDetail.Phone,
                    role: userDetail.Role.Name,
                    avatar_url: userDetail.AvatarUrl,
                    created_at: userDetail.CreatedAt,
                    updated_at: userDetail.UpdatedAt,
                    created_by: userDetail.CreatedBy,
                    updated_by: userDetail.UpdatedBy
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    create(dto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const checkEmail = yield this.userModel.exists({ 'Email': dto.email });
                const checkPhone = yield this.userModel.exists({ 'Phone': dto.phone });
                const getRole = yield this.roleModel.findOne({ 'Name': dto.role }).select('-IsDeleted -CreatedAt -UpdatedAt -CreatedBy -UpdatedBy').exec();
                if (checkEmail && checkPhone) {
                    throw new common_1.HttpException({ status: "error", message: 'Email and Phone number already exists', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                else {
                    if (checkEmail) {
                        throw new common_1.HttpException({ status: "error", message: 'Email already exists', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (checkPhone) {
                        throw new common_1.HttpException({ status: "error", message: 'Phone number already exists', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (!ValidateUtil_1.REGEXP_LETTER.test(dto.display_name)) {
                        throw new common_1.HttpException({ status: "error", message: 'Invalid DisplayName !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (!ValidateUtil_1.REGEXP_LETTER.test(dto.first_name)) {
                        throw new common_1.HttpException({ status: "error", message: 'Invalid FirstName !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (!ValidateUtil_1.REGEXP_LETTER.test(dto.last_name)) {
                        throw new common_1.HttpException({ status: "error", message: 'Invalid LastName !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (!ValidateUtil_1.REGEXP_LETTER.test(dto.middle_name)) {
                        throw new common_1.HttpException({ status: "error", message: 'Invalid MiddleName !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (!ValidateUtil_1.REGEXP_EMAIL.test(dto.email)) {
                        throw new common_1.HttpException({ status: "error", message: 'Invalid Email !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (dto.address) {
                        if (!ValidateUtil_1.REGEXP_ADDRESS.test(dto.address)) {
                            throw new common_1.HttpException({ status: "error", message: 'Invalid Address !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                        }
                    }
                    if (!ValidateUtil_1.REGEXP_PHONE.test(dto.phone)) {
                        throw new common_1.HttpException({ status: "error", message: 'Invalid Phone !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (!ValidateUtil_1.REGEXP_PASSWORD.test(dto.password)) {
                        throw new common_1.HttpException({ status: "error", message: 'Invalid PassWord !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hash_password = yield bcrypt_1.default.hash(dto.password, salt);
                    dto.password = hash_password;
                    const entity = {
                        _id: new mongoose_2.Types.ObjectId(),
                        DisplayName: dto.display_name,
                        Password: dto.password,
                        FristName: dto.first_name,
                        LastName: dto.last_name,
                        MiddleName: dto.middle_name,
                        Email: dto.email,
                        DateOfBirth: dto.date_of_birth,
                        Address: dto.address,
                        Phone: dto.phone,
                        AvatarUrl: dto.avatar_url || pathFile_1.PATH_AVATAR_DEFAULT,
                        Role: getRole,
                        CreatedAt: new Date(),
                        UpdatedAt: new Date(),
                        IsDeleted: false,
                        CreatedBy: dto.created_by,
                        UpdatedBy: dto.updated_by,
                        RefreshToken: ''
                    };
                    yield new this.userModel(entity).save();
                    return {
                        status: "success",
                        message: "Create User Successfuly ",
                        title: "Success"
                    };
                }
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    update(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.findOne(data.email);
                const checkEmail = yield this.userModel.exists({ 'Email': data.email });
                const checkPhone = yield this.userModel.exists({ 'Phone': data.phone });
                const passWordMath = yield this.userModel.findOne({ 'Email': data.email });
                const getRefreshToken = yield this.userModel.findOne({ 'Email': data.email });
                const getRole = yield this.roleModel.findOne({ 'Name': data.role }).select('-IsDeleted -CreatedAt -UpdatedAt -CreatedBy -UpdatedBy').exec();
                if (user.email != data.email) {
                    if (checkEmail) {
                        throw new common_1.HttpException({ status: "Errors", message: 'Email already exists', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                if (user.phone != data.phone) {
                    if (checkPhone) {
                        throw new common_1.HttpException({ status: "Errors", message: 'Phone already exists', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                if (!ValidateUtil_1.REGEXP_LETTER.test(data.display_name)) {
                    throw new common_1.HttpException({ status: "Error", message: 'Invalid DisplayName !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!ValidateUtil_1.REGEXP_LETTER.test(data.first_name)) {
                    throw new common_1.HttpException({ status: "Error", message: 'Invalid FirstName !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!ValidateUtil_1.REGEXP_LETTER.test(data.last_name)) {
                    throw new common_1.HttpException({ status: "Error", message: 'Invalid LastName !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!ValidateUtil_1.REGEXP_LETTER.test(data.middle_name)) {
                    throw new common_1.HttpException({ status: "Error", message: 'Invalid MiddleName !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!ValidateUtil_1.REGEXP_EMAIL.test(data.email)) {
                    throw new common_1.HttpException({ status: "Error", message: 'Invalid Email !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (data.address) {
                    if (!ValidateUtil_1.REGEXP_ADDRESS.test(data.address)) {
                        throw new common_1.HttpException({ status: "Error", message: 'Invalid Address !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                if (!ValidateUtil_1.REGEXP_PHONE.test(data.phone)) {
                    throw new common_1.HttpException({ status: "Error", message: 'Invalid Phone !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (data.password) {
                    if (!ValidateUtil_1.REGEXP_PASSWORD.test(data.password)) {
                        throw new common_1.HttpException({ status: "Error", message: 'Invalid PassWord !', title: "Errors" }, common_1.HttpStatus.BAD_REQUEST);
                    }
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hash_password = yield bcrypt_1.default.hash(data.password, salt);
                    data.password = hash_password;
                }
                const entity = {
                    _id: new mongoose_2.Types.ObjectId(user.id),
                    DisplayName: data.display_name,
                    FristName: data.first_name,
                    LastName: data.last_name,
                    MiddleName: data.middle_name,
                    Email: data.email,
                    DateOfBirth: data.date_of_birth,
                    Address: data.address,
                    Phone: data.phone,
                    AvatarUrl: data.avatar_url,
                    Role: getRole,
                    Password: data.password == null ? passWordMath.Password : data.password,
                    CreatedAt: data.created_at,
                    UpdatedAt: new Date(),
                    IsDeleted: false,
                    CreatedBy: data.created_by,
                    UpdatedBy: data.updated_by,
                    RefreshToken: getRefreshToken.RefreshToken
                };
                yield this.userModel.updateOne({ _id: new mongoose_2.Types.ObjectId(user.id), }, { $set: entity });
                return {
                    status: "success",
                    message: "Update User Successfully",
                    title: "Success"
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    delete(user_email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userDetail = yield this.findOne(user_email);
                yield this.userModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(userDetail.id) }, { IsDeleted: true });
                return {
                    status: "success",
                    message: "Delete User Successfully",
                    title: "Success"
                };
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    updateRoleInUser(idRole, updatedRole) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userModel.find({ 'Role.Name': idRole });
                if (users.length > 0) {
                    const updatePromises = users.map((user) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        user.Role = updatedRole;
                        yield user.save();
                    }));
                    yield Promise.all(updatePromises);
                }
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
    updateRefreshTokenUser(email, refreshToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.updateOne({ 'Email': email }, { $set: { 'RefreshToken': refreshToken } });
                return user;
            }
            catch (error) {
                common_1.Logger.error(error);
            }
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(RoleSchema_1.Role.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./src/app/modules/users/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/users/UserModule.ts"), exports);


/***/ }),

/***/ "./src/app/utils/PaginationUtil.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationUtil = void 0;
const config_1 = __webpack_require__("./src/config.ts");
const defaultPage = config_1.GlobalConfig.Pagination.PageDefault;
const defaultLimit = config_1.GlobalConfig.Pagination.LimitDefault;
const maxLimitPerPage = config_1.GlobalConfig.Pagination.LimitMaximum;
class PaginationUtil {
    static parseFromDTO(dto) {
        const { _limit, _page } = dto;
        const page = isNaN(_page) ? defaultPage : +_page;
        let limit = isNaN(_limit) ? defaultLimit : +_limit;
        if (limit > maxLimitPerPage)
            limit = maxLimitPerPage;
        return {
            page,
            limit,
        };
    }
    static transformToPaginationResult(result_list, page, limit, total) {
        return {
            _next_page: 1,
            _prev_page: 1,
            _total: total,
            _total_page: total > limit ? ((Math.floor(total / limit) % 2 == 0) ? Math.floor(total / limit) : Math.floor(total / limit) + 1) : 1,
            _page: page,
            _limit: limit,
            result: result_list,
        };
    }
}
exports.PaginationUtil = PaginationUtil;


/***/ }),

/***/ "./src/app/utils/ValidateUtil.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REGEXP_PASSWORD = exports.REGEXP_EMAIL = exports.REGEXP_ADDRESS = exports.REGEXP_PHONE = exports.REGEXP_LETTER = void 0;
exports.REGEXP_LETTER = /^[\p{L}\s'-]+$/u;
exports.REGEXP_PHONE = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
exports.REGEXP_ADDRESS = /^[\p{L}\s0-9',\/-]+$/u;
exports.REGEXP_EMAIL = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
exports.REGEXP_PASSWORD = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;


/***/ }),

/***/ "./src/app/utils/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/utils/PaginationUtil.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/utils/ValidateUtil.ts"), exports);


/***/ }),

/***/ "./src/config.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalConfig = void 0;
exports.GlobalConfig = {
    Pagination: {
        PageDefault: 1,
        LimitDefault: 10,
        LimitMaximum: 50,
    },
    Authentication: {
        ServerKey: 'SAMPLE_SERVER_KEY',
        ServerKeyRefresh: 'SAMPLE_SERVER_KEY_REFRESH',
        ExpiresIn: '1d',
        ExpiresInRefresh: '10d'
    },
    Database: {
        MongoURI: process.env.MONGO_URI,
    },
    DIR: process.env.IS_DEV === 'true' ? process.cwd() : __dirname
};


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/APIEndpoints.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APIEndpoints = void 0;
const auth_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/auth/index.ts");
const modules_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/modules/index.ts");
exports.APIEndpoints = {
    Users: modules_1.UserEndpoints,
    Auth: auth_1.AuthEndpoints
};


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/_shared/pathFile.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PATH_AVATAR_DEFAULT = exports.PATH_FILE_BANNER_UPLOAD = exports.PATH_FILE_NEWS_UPLOAD = exports.PATH_FILE_AVATAR_UPLOAD = exports.PATH_FILES = exports.HOST_API = void 0;
exports.HOST_API = 'http://localhost:3333';
exports.PATH_FILES = '/uploads/';
exports.PATH_FILE_AVATAR_UPLOAD = './uploads/avatar-user/';
exports.PATH_FILE_NEWS_UPLOAD = './uploads/image-cover/';
exports.PATH_FILE_BANNER_UPLOAD = './uploads/image-banner/';
exports.PATH_AVATAR_DEFAULT = 'fa9decf0-421b-429a-9573-42b43a6e9806image_default.png';


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/auth/AuthDTOs.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth_SignInDTO = void 0;
class Auth_SignInDTO {
}
exports.Auth_SignInDTO = Auth_SignInDTO;


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/auth/AuthEndpoint.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthEndpoints = void 0;
exports.AuthEndpoints = {
    SignIn: 'auth/sign-in',
    SignOut: 'auth/sign-out',
    GetMyInfo: 'auth/me',
    Refresh: 'auth/refresh',
    RemoveCookie: 'auth/remove-cookie'
};


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/auth/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/auth/AuthEndpoint.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/auth/AuthDTOs.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/common/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/common/types/index.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/common/types/PaginationDTO.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/common/types/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/common/types/PaginationDTO.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/APIEndpoints.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/auth/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/common/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/utils/index.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/banners/BannerDTOs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Banner_UpsertDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class Banner_UpsertDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)()
    // @MaxLength(20)
    ,
    tslib_1.__metadata("design:type", String)
], Banner_UpsertDTO.prototype, "banner_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], Banner_UpsertDTO.prototype, "banner_paragraph", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Boolean)
], Banner_UpsertDTO.prototype, "pin_top", void 0);
exports.Banner_UpsertDTO = Banner_UpsertDTO;


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/banners/BannerEndPoint.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BannerEndpoints = void 0;
const utils_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/index.ts");
const prefixBannerModule = 'banners';
const extendEndpoint = {};
exports.BannerEndpoints = Object.assign(Object.assign({}, utils_1.EndPointUtil.generateCRUD(prefixBannerModule)), extendEndpoint);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/banners/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/banners/BannerDTOs.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/banners/BannerEndPoint.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/users/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/upload/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/news/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/roles/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/products/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/banners/index.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/news/NewsDTOs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.News_UpsertDTO = exports.News_CreateDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class News_CreateDTO {
}
exports.News_CreateDTO = News_CreateDTO;
class News_UpsertDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], News_UpsertDTO.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], News_UpsertDTO.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], News_UpsertDTO.prototype, "rich_text_content", void 0);
exports.News_UpsertDTO = News_UpsertDTO;
// export class Message_Response {
//     status!:string;
//     title!:string;
//     message!:string;
// }


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/news/NewsEndpoint.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsEndpoints = void 0;
const utils_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/index.ts");
const prefixNewsModule = 'news';
const extendEndpoint = {};
exports.NewsEndpoints = Object.assign(Object.assign({}, utils_1.EndPointUtil.generateCRUD(prefixNewsModule)), extendEndpoint);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/news/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/news/NewsDTOs.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/news/NewsEndpoint.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/products/ProductDTOs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product_UpsertDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class Product_UpsertDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], Product_UpsertDTO.prototype, "product_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], Product_UpsertDTO.prototype, "product_density", void 0);
exports.Product_UpsertDTO = Product_UpsertDTO;


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/products/ProductEndPoint.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductEndpoints = void 0;
const utils_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/index.ts");
const prefixProductModule = 'products';
const extendEndpoint = {};
exports.ProductEndpoints = Object.assign(Object.assign({}, utils_1.EndPointUtil.generateCRUD(prefixProductModule)), extendEndpoint);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/products/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/products/ProductDTOs.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/products/ProductEndPoint.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/roles/RoleDTOs.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role_CreateDTO = void 0;
class Role_CreateDTO {
}
exports.Role_CreateDTO = Role_CreateDTO;


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/roles/RoleEndpoint.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEndpoints = void 0;
const utils_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/index.ts");
const prefixRolesModule = 'roles';
const extendEndpoint = {};
exports.RoleEndpoints = Object.assign(Object.assign({}, utils_1.EndPointUtil.generateCRUD(prefixRolesModule)), extendEndpoint);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/roles/RolePermissions.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APP_CONSTANT_PERMISSIONS = void 0;
exports.APP_CONSTANT_PERMISSIONS = [
    {
        id: '@Permission/User/View',
        name: 'View a users list'
    },
    {
        id: '@Permission/User/Create',
        name: 'Create user'
    },
    {
        id: '@Permission/User/Update',
        name: 'Update user'
    },
    {
        id: '@Permission/User/Delete',
        name: 'Delete user'
    },
    {
        id: '@Permission/Role/View',
        name: 'View a roles list'
    },
    {
        id: '@Permission/Role/Create',
        name: 'Create role'
    },
    {
        id: '@Permission/Role/Update',
        name: 'Update role'
    },
    {
        id: '@Permission/Role/Delete',
        name: 'Delete role'
    },
    {
        id: '@Permission/News/View',
        name: 'View a news list'
    },
    {
        id: '@Permission/News/Create',
        name: 'Create news'
    },
    {
        id: '@Permission/News/Update',
        name: 'Update news'
    },
    {
        id: '@Permission/News/Delete',
        name: 'Delete news'
    },
    {
        id: '@Permission/Banner/View',
        name: 'View a banners list'
    },
    {
        id: '@Permission/Banner/Create',
        name: 'Create banner'
    },
    {
        id: '@Permission/Banner/Update',
        name: 'Update Banner'
    },
    {
        id: '@Permission/Banner/Delete',
        name: 'Delete Banner'
    },
    {
        id: '@Permission/Product/View',
        name: 'View a products list'
    },
    {
        id: '@Permission/Product/Create',
        name: 'Create product'
    },
    {
        id: '@Permission/Product/Update',
        name: 'Update product'
    },
    {
        id: '@Permission/Product/Delete',
        name: 'Delete product'
    }
];


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/roles/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/roles/RoleDTOs.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/roles/RoleEndpoint.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/upload/UploadDTO.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/upload/UploadEndPoint.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadEndpoints = void 0;
const utils_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/index.ts");
const prefixUsersModule = 'upload';
const extendEndpoint = {};
exports.UploadEndpoints = Object.assign(Object.assign({}, utils_1.EndPointUtil.generateCRUD(prefixUsersModule)), extendEndpoint);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/upload/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/upload/UploadDTO.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/upload/UploadEndPoint.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/users/UserDTOs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User_UpsertDTO = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class User_UpsertDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    tslib_1.__metadata("design:type", String)
], User_UpsertDTO.prototype, "display_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], User_UpsertDTO.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    tslib_1.__metadata("design:type", String)
], User_UpsertDTO.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    tslib_1.__metadata("design:type", String)
], User_UpsertDTO.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User_UpsertDTO.prototype, "date_of_birth", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(10),
    tslib_1.__metadata("design:type", String)
], User_UpsertDTO.prototype, "phone", void 0);
exports.User_UpsertDTO = User_UpsertDTO;


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/users/UserEndpoint.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEndpoints = void 0;
const utils_1 = __webpack_require__("../../../libs/erp/api-interfaces/src/utils/index.ts");
const prefixUsersModule = 'users';
const extendEndpoint = {};
exports.UserEndpoints = Object.assign(Object.assign({}, utils_1.EndPointUtil.generateCRUD(prefixUsersModule)), extendEndpoint);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/modules/users/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/users/UserDTOs.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/modules/users/UserEndpoint.ts"), exports);


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/utils/DTOUtil.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/utils/EndPointUtil.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EndPointUtil = void 0;
class EndPointUtil {
    static generateCRUD(module_name) {
        return {
            Find: `${module_name}`,
            Create: `${module_name}`,
            FindOne: `${module_name}/id`,
            FindPermissionOfUserByEmail: `${module_name}/email`,
            Update: `${module_name}/id`,
            Delete: `${module_name}/id`,
            UploadFile: `${module_name}/upload`,
        };
    }
}
exports.EndPointUtil = EndPointUtil;


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/utils/Enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permission = exports.Role = exports.Action = void 0;
var Action;
(function (Action) {
    Action["View"] = "view";
    Action["Create"] = "create";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
})(Action = exports.Action || (exports.Action = {}));
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role = exports.Role || (exports.Role = {}));
var Permission;
(function (Permission) {
    Permission["USER_VIEW"] = "@Permission/User/View";
    Permission["USER_CREATE"] = "@Permission/User/Create";
    Permission["USER_UPDATE"] = "@Permission/User/Update";
    Permission["USER_DELETE"] = "@Permission/User/Delete";
    Permission["NEWS_VIEW"] = "@Permission/News/View";
    Permission["NEWS_CREATE"] = "@Permission/News/Create";
    Permission["NEWS_UPDATE"] = "@Permission/News/Update";
    Permission["NEWS_DELETE"] = "@Permission/News/Delete";
    Permission["BANNER_VIEW"] = "@Permission/Banner/View";
    Permission["BANNER_CREATE"] = "@Permission/Banner/Create";
    Permission["BANNER_UPDATE"] = "@Permission/Banner/Update";
    Permission["BANNER_DELETE"] = "@Permission/Banner/Delete";
    Permission["ROLE_VIEW"] = "@Permission/Role/View";
    Permission["ROLE_CREATE"] = "@Permission/Role/Create";
    Permission["ROLE_UPDATE"] = "@Permission/Role/Update";
    Permission["ROLE_DELETE"] = "@Permission/Role/Delete";
    Permission["PRODUCT_VIEW"] = "@Permission/Product/View";
    Permission["PRODUCT_CREATE"] = "@Permission/Product/Create";
    Permission["PRODUCT_UPDATE"] = "@Permission/Product/Update";
    Permission["PRODUCT_DELETE"] = "@Permission/Product/Delete";
})(Permission = exports.Permission || (exports.Permission = {}));


/***/ }),

/***/ "../../../libs/erp/api-interfaces/src/utils/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/utils/EndPointUtil.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../../libs/erp/api-interfaces/src/utils/DTOUtil.ts"), exports);


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "multer":
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "rxjs/operators":
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const cookie_parser_1 = tslib_1.__importDefault(__webpack_require__("cookie-parser"));
const AppModule_1 = __webpack_require__("./src/app/AppModule.ts");
const LoggingInterceptor_1 = __webpack_require__("./src/app/auth/LoggingInterceptor.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(AppModule_1.AppModule);
        app.enableCors({
            origin: true,
            credentials: true
        });
        app.useGlobalInterceptors(new LoggingInterceptor_1.LoggingInterceptor());
        app.useGlobalPipes(new common_1.ValidationPipe());
        const globalPrefix = 'api';
        app.use((0, cookie_parser_1.default)());
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map