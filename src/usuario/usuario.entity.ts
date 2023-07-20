import { Exclude, Expose } from "class-transformer";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { IsNomeUsuarioUnico } from "./isNomeUsuarioUnico.validator";

export class Usuario {
    @IsNotEmpty({message: 'Nome de usuário não pode ser vazio'})
    @IsAlphanumeric("pt-BR", {message: 'Nome de usuário deve conter apenas letras e números'})
    @IsNomeUsuarioUnico({message: 'Nome de usuário já está em uso'})
    @Expose({name: 'username'})
    nomeUsuario: string;

    @IsEmail({}, {message: 'Email inválido'})
    @Expose({name: 'email'})
    email: string;

    @IsNotEmpty({message: 'Senha não pode ser vazia'})
    @IsStrongPassword({}, {message: 'Senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número'})
    @Exclude({toPlainOnly: true})
    @Expose({name: 'password'})
    senha: string;

    @IsNotEmpty({message: 'Nome completo não pode ser vazio'})
    @Expose({name: 'fullName'})
    nomeCompleto: string;

    id: number;

    @Expose({name: 'joinDate'})
    dataEntrada: Date;
}