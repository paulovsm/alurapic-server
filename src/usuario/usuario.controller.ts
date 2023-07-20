import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { NestResponse } from "../core/http/nestResponse";
import { NestResponseBuilder } from "../core/http/nestResponseBuilder";
import { Usuario } from "./usuario.entity";
import UsuarioService from "./usuario.service";

@Controller('user')
export default class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }

    @Post()
    public criarUsuario(@Body() usuario: Usuario): NestResponse {

        const usuarioCriado = this.usuarioService.criarUsuario(usuario);

        return new NestResponseBuilder()
            .comStatus(HttpStatus.CREATED)
            .comHeaders({
                'Location': `/user/${usuarioCriado.nomeUsuario}`
            })
            .comBody(usuarioCriado)
            .build();
    }

    @Get(':usuario')
    public buscarUsuarioPorUsuario(@Param('usuario') usuario: string): Usuario {
        const usuarioExistente = this.usuarioService.buscarUsuarioPorNomeUsuario(usuario);

        if (!usuarioExistente) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                error: `Usuário ${usuario} não encontrado`
            })
        }

        return usuarioExistente;
    }
}