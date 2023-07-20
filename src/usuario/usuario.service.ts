import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.entity";

@Injectable()
export default class UsuarioService {
    private usuarios: Usuario[] = [
        {
            nomeUsuario: 'admin',
            email: 'admin@teste.com',
            senha: '123456',
            nomeCompleto: 'Administrador',
            id: 1,
            dataEntrada: new Date()
        }
    ];

    public criarUsuario(usuario: Usuario): Usuario {
        this.usuarios.push(usuario);

        return usuario;

    }
    public buscarUsuarioPorNomeUsuario(nomeUsuario: string): Usuario {
        return this.usuarios.find(usuario => usuario.nomeUsuario === nomeUsuario);
    }
}