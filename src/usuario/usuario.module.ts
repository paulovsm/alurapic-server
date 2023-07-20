import { Module } from '@nestjs/common';
import { IsNomeUsuarioUnicoValidator } from './isNomeUsuarioUnico.validator';
import UsuarioController from './usuario.controller';
import UsuarioService from './usuario.service';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [UsuarioService, IsNomeUsuarioUnicoValidator],
})
export class UsuarioModule {}