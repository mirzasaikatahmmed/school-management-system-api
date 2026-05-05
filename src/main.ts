import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('School Management API')
    .setDescription(
      'REST API for the multi-branch school management system.\n\n' +
        '**Authentication:** Use `POST /api/v1/auth/login` to get a Bearer token, ' +
        'then click **Authorize** and paste it.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .addTag('Auth', 'Login, profile, token refresh, password change')
    .addTag(
      'Admission',
      'Full student admission — student + guardian + login credentials + enrollment + transport + hostel in one request',
    )
    .addTag(
      'Dashboard',
      'Summary statistics, attendance summary, recent payments',
    )
    .addTag('Branches', 'Multi-branch management')
    .addTag(
      'Academic – School Years',
      'Academic session / school year management',
    )
    .addTag('Academic – Classes', 'Class management')
    .addTag('Academic – Sections', 'Section management')
    .addTag('Academic – Subjects', 'Subject management')
    .addTag('Students', 'Student registration, enrollment and promotion')
    .addTag('Parents', 'Parent profiles')
    .addTag('Staff', 'Staff, departments and designations')
    .addTag('Attendance', 'Student and staff attendance')
    .addTag('Leave', 'Leave categories, applications and approvals')
    .addTag('Fees', 'Fee types, groups, allocations and payments')
    .addTag(
      'Accounting',
      'Accounts, voucher heads, transactions, balance sheet',
    )
    .addTag('Payroll', 'Salary templates and payroll processing')
    .addTag('Advance Salary', 'Advance salary requests and approvals')
    .addTag('Exam', 'Exam terms, exams, grades and marks')
    .addTag(
      'Online Exam',
      'MCQ questions, exam sessions, submissions and auto-scoring',
    )
    .addTag('Timetable', 'Class and exam timetables')
    .addTag('Homework', 'Homework assignments and submissions')
    .addTag('Library', 'Book management and issue/return')
    .addTag('Transport', 'Routes, vehicles, stoppages and student assignments')
    .addTag('Hostel', 'Hostel, rooms, categories and allocations')
    .addTag('Inventory', 'Products, categories and stock management')
    .addTag('Communication', 'Events and internal messaging')
    .addTag('Reception', 'Visitor logs, postal records and complaints')
    .addTag(
      'Certificates & Cards',
      'Certificate, ID card and admit card templates',
    )
    .addTag('Awards', 'Student and staff awards')
    .addTag('Alumni', 'Alumni records')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
    customSiteTitle: 'School Management API Docs',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`School Management API  →  http://localhost:${port}/api/v1`);
  console.log(`Swagger docs          →  http://localhost:${port}/api/docs`);
}
void bootstrap();
