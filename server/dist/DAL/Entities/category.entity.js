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
exports.Category = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const subCategory_entity_1 = require("./subCategory.entity");
let Category = class Category extends typeorm_1.BaseEntity {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Category.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subCategory_entity_1.SubCategory, (subCategory) => subCategory.category, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Category.prototype, "subCategories", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "updated_at", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
//# sourceMappingURL=category.entity.js.map