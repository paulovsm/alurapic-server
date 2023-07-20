import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import UsuarioService from "./usuario.service";

@Injectable()
@ValidatorConstraint({async: true})
export class IsNomeUsuarioUnicoValidator implements ValidatorConstraintInterface {

    constructor(private usuarioService: UsuarioService) {}

    validate(nomeUsuario: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        const usuarioExistente = !!this.usuarioService.buscarUsuarioPorNomeUsuario(nomeUsuario);
        
        return !usuarioExistente;
    }
}
        

export function IsNomeUsuarioUnico(validationOptions: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isNomeUsuarioUnico",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNomeUsuarioUnicoValidator

        });
    };

}