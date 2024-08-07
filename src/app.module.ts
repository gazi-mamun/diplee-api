import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { MulterModule } from '@nestjs/platform-express';
import { ProductImageModule } from './product-image/product-image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { OrderItemModule } from './order_item/order_item.module';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DatabaseModule,
    ProductModule,
    ProductVariantModule,
    OrderModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      // rootPath: join(__dirname, '..', '../uploads'),
      serveRoot: '/uploads/',
    }),
    ProductImageModule,
    UserModule,
    OrderItemModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
