import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
    
    const app = await NestFactory.create(AppModule);

    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('PORT');

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    const documentBuilder = new DocumentBuilder()
        .setTitle('Music API')
        .setDescription('The music API description')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },'JWT',)
        .build();

    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('api', app, document);

    await app.listen(port, () => {
        console.log('[Web App Initialized]', `http://localhost:${port}`);
    });
}

bootstrap();
