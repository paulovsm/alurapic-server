import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroExcecacaoHttp } from './common/filtors/FIltroExcecaoHttp.filter';
import { NestResponseTransformerInterceptor } from './core/http/nestResponseTransformerInterceptor';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor},
    { provide: APP_FILTER, useClass: FiltroExcecacaoHttp},
    { provide: APP_INTERCEPTOR, useClass: NestResponseTransformerInterceptor}
  ],
})
export class AppModule {}
