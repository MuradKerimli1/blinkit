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
exports.CartProduct = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const class_validator_1 = require("class-validator");
const product_entity_1 = require("./product.entity");
let CartProduct = class CartProduct extends typeorm_1.BaseEntity {
};
exports.CartProduct = CartProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    __metadata("design:type", product_entity_1.Product)
], CartProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CartProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.shopping_cart),
    __metadata("design:type", user_entity_1.User)
], CartProduct.prototype, "user", void 0);
exports.CartProduct = CartProduct = __decorate([
    (0, typeorm_1.Entity)()
], CartProduct);
//# sourceMappingURL=cartProduct.entity.js.map