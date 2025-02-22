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
exports.Addreses = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Addreses = class Addreses extends typeorm_1.BaseEntity {
};
exports.Addreses = Addreses;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Addreses.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Addreses.prototype, "address_line", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Addreses.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Addreses.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Addreses.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Addreses.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Addreses.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Addreses.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.address_details),
    __metadata("design:type", user_entity_1.User)
], Addreses.prototype, "user", void 0);
exports.Addreses = Addreses = __decorate([
    (0, typeorm_1.Entity)()
], Addreses);
//# sourceMappingURL=adress.entity.js.map