"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../enums/user");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const insertIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.orderedBooks.length < 1) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Add Book to your order list');
    }
    const orderedBooks = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transactionClient.order.create({
            data: {
                userId,
            },
        });
        for (let index = 0; index < payload.orderedBooks.length; index++) {
            yield transactionClient.orderedBook.create({
                data: {
                    bookId: payload.orderedBooks[index].bookId,
                    quantity: payload.orderedBooks[index].quantity,
                    orderId: order.id,
                },
            });
        }
        return order;
    }));
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id: orderedBooks.id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getAllFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user.role === user_1.ENUM_USER_ROLE.ADMIN) {
        result = yield prisma_1.default.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
    }
    else if (user.role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId: user.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
    }
    return result;
});
const getDataById = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user.role === user_1.ENUM_USER_ROLE.ADMIN) {
        result = yield prisma_1.default.order.findUnique({
            where: {
                id,
            },
            include: {
                orderedBooks: true,
            },
        });
    }
    else if (user.role === user_1.ENUM_USER_ROLE.CUSTOMER) {
        result = yield prisma_1.default.order.findFirst({
            where: {
                id,
                userId: user.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
    }
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
};
