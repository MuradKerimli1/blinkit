"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const user_entity_1 = require("./user.entity");
const adress_entity_1 = require("./adress.entity");
let Order = class Order extends typeorm_1.BaseEntity {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.orderHistory),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Order.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.Product),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Order.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Order.prototype, "paymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Order.prototype, "payment_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => adress_entity_1.Addreses),
    __metadata("design:type", adress_entity_1.Addreses)
], Order.prototype, "delivery_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Order.prototype, "subTotalAmt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Order.prototype, "totalAmt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Order.prototype, "invoice_receipt", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
//# sourceMappingURL=order.entity.js.map