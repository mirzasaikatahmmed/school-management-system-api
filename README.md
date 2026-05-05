# School Management API

A comprehensive NestJS REST API backend for a multi-branch school management system. Built to mirror the feature set of the `ramom-multi-branch-school-management-system` PHP/CodeIgniter application with a modern TypeScript/NestJS stack.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | TypeORM 0.3 |
| Auth | Passport + JWT (Bearer) |
| Password Hashing | bcrypt |
| API Envelope | nestjs-api-forge v1.0.2 |
| Validation | class-validator + class-transformer |
| Docs | @nestjs/swagger (Swagger UI) |

---

## Project Structure

```
src/
├── app.module.ts                        # Root module — registers all 31 feature modules
├── main.ts                              # Bootstrap: global prefix /api/v1, Swagger, validation pipe
├── data-source.ts                       # TypeORM DataSource (used by migrations)
├── common/
│   ├── constants/
│   │   └── roles.enum.ts               # Role enum: SUPER_ADMIN=1 … STAFF=9
│   ├── decorators/
│   │   ├── current-user.decorator.ts   # @CurrentUser() — extracts JWT payload
│   │   └── roles.decorator.ts          # @Roles(...) — metadata for RolesGuard
│   ├── guards/
│   │   ├── jwt-auth.guard.ts           # Validates Bearer token
│   │   └── roles.guard.ts             # Checks @Roles() metadata against JWT role
│   ├── pipes/
│   │   └── parse-int-id.pipe.ts        # Validates :id params are positive integers
│   └── strategies/
│       └── jwt.strategy.ts             # Passport JWT strategy — decodes token payload
└── modules/
    ├── academic/                        # Sessions, classes, sections, subjects
    ├── accounting/                      # Chart of accounts, voucher heads, transactions, reports
    ├── admission/                       # Unified student admission (atomic transaction)
    ├── advance-salary/                  # Staff advance salary requests
    ├── alumni/                          # Alumni registry
    ├── attendance/                      # Daily student & staff attendance
    ├── auth/                            # Login, profile, change password
    ├── award/                           # Awards for students and staff
    ├── book/                            # Library: books, issues, returns
    ├── certificate/                     # Certificate & ID card template management
    ├── dashboard/                       # Summary stats, attendance overview, recent payments
    ├── event/                           # School calendar events
    ├── exam/                            # Exams, marks, grade rules, results
    ├── fee/                             # Fee types, student assignments, payment collection
    ├── homework/                        # Teacher homework, student submission, evaluation
    ├── hostel/                          # Hostels, rooms, categories, allocations
    ├── inventory/                       # Categories, products, stock tracking, issues
    ├── leave/                           # Leave categories, applications, approval
    ├── notice/                          # Notice board
    ├── online-exam/                     # MCQ questions, sessions, student submissions (auto-graded)
    ├── parents/                         # Parent/guardian management
    ├── payroll/                         # Salary templates, payroll generation, payment
    ├── reception/                       # Visitor log, postal records, complaints
    ├── staff/                           # Staff profiles, documents
    ├── student/                         # Student profiles, promotion history
    ├── timetable/                       # Class timetables, exam timetables
    ├── transport/                       # Routes, vehicles, stoppages, student assignments
    └── user/                            # System user management
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- PostgreSQL ≥ 14
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Edit .env with your database credentials and JWT secret

# 4. Start development server (TypeORM synchronize:true auto-creates tables)
npm run start:dev
```

### Development Server

```
http://localhost:3000
```

All endpoints are prefixed with `/api/v1`.

Swagger UI: `http://localhost:3000/api/docs`

---

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=school_management

# JWT
JWT_SECRET=your_very_long_random_secret_here
JWT_EXPIRES_IN=7d

# App
PORT=3000
NODE_ENV=development
```

---

## Authentication

All protected endpoints require a `Bearer` token in the `Authorization` header.

### Login

```
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "role": 2
    }
  }
}
```

### Using the Token

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## API Response Format

All responses use a standardized envelope from `nestjs-api-forge`:

### Success

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Students fetched",
  "data": [ ... ],
  "meta": null
}
```

### Error

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Student not found",
  "data": null
}
```

---

## Role Reference

| ID | Role | Description |
|---|---|---|
| 1 | SUPER_ADMIN | Full system access across all branches |
| 2 | ADMIN | Branch-level admin |
| 3 | TEACHER | Class and subject management |
| 4 | ACCOUNTANT | Financial operations |
| 5 | LIBRARIAN | Library management |
| 6 | PARENT | View child's info |
| 7 | STUDENT | View own data, submit exams/homework |
| 8 | RECEPTIONIST | Front desk operations |
| 9 | STAFF | General staff |

---

## Module Completion Status

| # | Module | Status | Endpoints | Notes |
|---|---|---|---|---|
| 1 | Auth | ✅ Complete | 3 | Login, profile, change password |
| 2 | User | ✅ Complete | 5 | System user CRUD |
| 3 | Academic | ✅ Complete | 18 | Sessions, classes, sections, subjects |
| 4 | Student | ✅ Complete | 6 | Profiles, promotion, history |
| 5 | Admission | ✅ Complete | 2 | Atomic multi-table transaction |
| 6 | Parents | ✅ Complete | 5 | Guardian management |
| 7 | Staff | ✅ Complete | 8 | Staff profiles, documents |
| 8 | Attendance | ✅ Complete | 6 | Student & staff daily attendance |
| 9 | Fee | ✅ Complete | 10 | Types, assignments, payments |
| 10 | Exam | ✅ Complete | 12 | Exams, marks, grades, results |
| 11 | Online Exam | ✅ Complete | 10 | MCQ, sessions, auto-graded submissions |
| 12 | Homework | ✅ Complete | 7 | Create, submit, evaluate |
| 13 | Timetable | ✅ Complete | 7 | Class & exam timetables |
| 14 | Book (Library) | ✅ Complete | 8 | Books, issue, return |
| 15 | Notice | ✅ Complete | 5 | Notice board |
| 16 | Event | ✅ Complete | 5 | School calendar |
| 17 | Hostel | ✅ Complete | 12 | Hostels, rooms, categories, allocations |
| 18 | Transport | ✅ Complete | 15 | Routes, vehicles, stoppages, assignments |
| 19 | Accounting | ✅ Complete | 12 | Accounts, vouchers, transactions, reports |
| 20 | Payroll | ✅ Complete | 10 | Templates, generate, pay |
| 21 | Advance Salary | ✅ Complete | 5 | Apply, approve, reject, pay |
| 22 | Leave | ✅ Complete | 8 | Categories, applications, approval |
| 23 | Inventory | ✅ Complete | 10 | Categories, products, stock, issues |
| 24 | Reception | ✅ Complete | 10 | Visitors, postal, complaints |
| 25 | Certificate | ✅ Complete | 5 | Template management |
| 26 | Award | ✅ Complete | 4 | Student & staff awards |
| 27 | Alumni | ✅ Complete | 5 | Alumni registry |
| 28 | Dashboard | ✅ Complete | 3 | Stats, attendance summary, recent payments |
| **Total** | | **28 modules** | **~232 endpoints** | |

---

## API Endpoint Reference

### Auth — `/api/v1/auth`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Login and receive JWT |
| GET | `/auth/profile` | All authenticated | Get current user profile |
| PATCH | `/auth/change-password` | All authenticated | Change own password |

---

### Users — `/api/v1/users`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/users` | SUPER_ADMIN | Create system user |
| GET | `/users` | SUPER_ADMIN, ADMIN | List users |
| GET | `/users/:id` | SUPER_ADMIN, ADMIN | Get user details |
| PATCH | `/users/:id` | SUPER_ADMIN | Update user |
| DELETE | `/users/:id` | SUPER_ADMIN | Delete user |

---

### Academic — `/api/v1/academic`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/academic/sessions` | SUPER_ADMIN, ADMIN | Create academic session |
| GET | `/academic/sessions` | All | List sessions |
| PATCH | `/academic/sessions/:id` | SUPER_ADMIN, ADMIN | Update session |
| DELETE | `/academic/sessions/:id` | SUPER_ADMIN, ADMIN | Delete session |
| POST | `/academic/classes` | SUPER_ADMIN, ADMIN | Create class |
| GET | `/academic/classes` | All | List classes |
| PATCH | `/academic/classes/:id` | SUPER_ADMIN, ADMIN | Update class |
| DELETE | `/academic/classes/:id` | SUPER_ADMIN, ADMIN | Delete class |
| POST | `/academic/sections` | SUPER_ADMIN, ADMIN | Create section |
| GET | `/academic/sections` | All | List sections (filter: classId) |
| PATCH | `/academic/sections/:id` | SUPER_ADMIN, ADMIN | Update section |
| DELETE | `/academic/sections/:id` | SUPER_ADMIN, ADMIN | Delete section |
| POST | `/academic/subjects` | SUPER_ADMIN, ADMIN | Create subject |
| GET | `/academic/subjects` | All | List subjects (filter: classId) |
| PATCH | `/academic/subjects/:id` | SUPER_ADMIN, ADMIN | Update subject |
| DELETE | `/academic/subjects/:id` | SUPER_ADMIN, ADMIN | Delete subject |
| POST | `/academic/assign-subjects` | SUPER_ADMIN, ADMIN | Assign subjects to class |
| GET | `/academic/assign-subjects` | All | List subject assignments |

---

### Admission — `/api/v1/admission`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/admission` | SUPER_ADMIN, ADMIN | Full admission: creates student, parent, credentials, enroll, transport, hostel atomically |
| GET | `/admission` | SUPER_ADMIN, ADMIN, TEACHER | List admissions (filter: classId, sectionId, sessionId, branchId) |

**Admission POST body sections:**

```json
{
  "classId": 1,
  "sectionId": 1,
  "roll": "101",
  "sessionId": 6,
  "branchId": 1,

  "firstName": "John",
  "lastName": "Doe",
  "dob": "2010-05-15",
  "gender": "male",
  "religion": "Islam",
  "bloodGroup": "B+",
  "phone": "01711223344",
  "email": "john@example.com",
  "address": "123 Main St",

  "username": "john.doe",
  "password": "secret123",

  "guardian": {
    "alreadyExists": false,
    "name": "Mr. Doe",
    "phone": "01911223344",
    "relation": "father",
    "username": "mr.doe",
    "password": "parent123"
  },

  "routeId": 1,
  "stoppageId": 2,
  "vehicleId": 1,

  "hostelId": 1,
  "roomId": 3,

  "previousSchool": "Green Valley School",
  "previousQualification": "Grade 5"
}
```

---

### Students — `/api/v1/students`

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/students` | SUPER_ADMIN, ADMIN, TEACHER | List students (filter: classId, sectionId, sessionId, branchId) |
| GET | `/students/:id` | SUPER_ADMIN, ADMIN, TEACHER, PARENT | Get student details |
| PATCH | `/students/:id` | SUPER_ADMIN, ADMIN | Update student |
| DELETE | `/students/:id` | SUPER_ADMIN, ADMIN | Delete student |
| POST | `/students/promote` | SUPER_ADMIN, ADMIN | Promote student to next class/session |
| GET | `/students/:id/promotion-history` | SUPER_ADMIN, ADMIN | Get promotion history |

---

### Parents — `/api/v1/parents`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/parents` | SUPER_ADMIN, ADMIN | Create parent record |
| GET | `/parents` | SUPER_ADMIN, ADMIN | List parents (filter: branchId) |
| GET | `/parents/:id` | SUPER_ADMIN, ADMIN, PARENT | Get parent details |
| PATCH | `/parents/:id` | SUPER_ADMIN, ADMIN | Update parent |
| DELETE | `/parents/:id` | SUPER_ADMIN, ADMIN | Delete parent |

---

### Staff — `/api/v1/staff`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/staff` | SUPER_ADMIN, ADMIN | Create staff member |
| GET | `/staff` | SUPER_ADMIN, ADMIN | List staff (filter: branchId, departmentId) |
| GET | `/staff/:id` | SUPER_ADMIN, ADMIN | Get staff details |
| PATCH | `/staff/:id` | SUPER_ADMIN, ADMIN | Update staff |
| DELETE | `/staff/:id` | SUPER_ADMIN, ADMIN | Delete staff |
| POST | `/staff/:id/documents` | SUPER_ADMIN, ADMIN | Upload staff document |
| GET | `/staff/:id/documents` | SUPER_ADMIN, ADMIN | List staff documents |
| DELETE | `/staff/documents/:id` | SUPER_ADMIN, ADMIN | Delete document |

---

### Attendance — `/api/v1/attendance`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/attendance/students` | SUPER_ADMIN, ADMIN, TEACHER | Record student attendance (bulk) |
| GET | `/attendance/students` | SUPER_ADMIN, ADMIN, TEACHER | List student attendance (filter: date, classId, sectionId) |
| GET | `/attendance/students/report` | SUPER_ADMIN, ADMIN, TEACHER | Monthly attendance report |
| POST | `/attendance/staff` | SUPER_ADMIN, ADMIN | Record staff attendance (bulk) |
| GET | `/attendance/staff` | SUPER_ADMIN, ADMIN | List staff attendance (filter: date, staffId) |
| GET | `/attendance/staff/report` | SUPER_ADMIN, ADMIN | Staff attendance report |

---

### Fees — `/api/v1/fees`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/fees/types` | SUPER_ADMIN, ADMIN | Create fee type |
| GET | `/fees/types` | All | List fee types (filter: branchId) |
| PATCH | `/fees/types/:id` | SUPER_ADMIN, ADMIN | Update fee type |
| DELETE | `/fees/types/:id` | SUPER_ADMIN, ADMIN | Delete fee type |
| POST | `/fees/assign` | SUPER_ADMIN, ADMIN | Assign fee to student |
| GET | `/fees/assign` | SUPER_ADMIN, ADMIN, ACCOUNTANT | List fee assignments (filter: studentId, sessionId) |
| POST | `/fees/collect` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Collect fee payment |
| GET | `/fees/payments` | SUPER_ADMIN, ADMIN, ACCOUNTANT | List payments (filter: studentId, month, sessionId) |
| GET | `/fees/due` | SUPER_ADMIN, ADMIN, ACCOUNTANT | List students with due fees |
| GET | `/fees/report` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Fee collection report |

---

### Exams — `/api/v1/exams`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/exams` | SUPER_ADMIN, ADMIN | Create exam |
| GET | `/exams` | All | List exams (filter: branchId, sessionId) |
| PATCH | `/exams/:id` | SUPER_ADMIN, ADMIN | Update exam |
| DELETE | `/exams/:id` | SUPER_ADMIN, ADMIN | Delete exam |
| POST | `/exams/grade-rules` | SUPER_ADMIN, ADMIN | Add grade rule |
| GET | `/exams/grade-rules` | All | List grade rules (filter: branchId) |
| POST | `/exams/marks` | SUPER_ADMIN, ADMIN, TEACHER | Enter student marks |
| GET | `/exams/marks` | All | Get marks (filter: examId, studentId, classId) |
| GET | `/exams/results` | All | Generate result sheet (filter: examId, classId) |
| POST | `/exams/marks/bulk` | SUPER_ADMIN, ADMIN, TEACHER | Bulk enter marks |
| PATCH | `/exams/marks/:id` | SUPER_ADMIN, ADMIN, TEACHER | Update mark entry |
| DELETE | `/exams/marks/:id` | SUPER_ADMIN, ADMIN | Delete mark entry |

---

### Online Exam — `/api/v1/online-exam`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/online-exam/questions` | SUPER_ADMIN, ADMIN, TEACHER | Create MCQ question (A/B/C/D + correct answer) |
| GET | `/online-exam/questions` | All | List questions (filter: subjectId, classId) |
| PATCH | `/online-exam/questions/:id` | SUPER_ADMIN, ADMIN, TEACHER | Update question |
| DELETE | `/online-exam/questions/:id` | SUPER_ADMIN, ADMIN, TEACHER | Delete question |
| POST | `/online-exam/sessions` | SUPER_ADMIN, ADMIN, TEACHER | Create exam session (durationMinutes, totalMarks, passMarks) |
| GET | `/online-exam/sessions` | All | List sessions (filter: subjectId, classId) |
| PATCH | `/online-exam/sessions/:id` | SUPER_ADMIN, ADMIN, TEACHER | Update session |
| DELETE | `/online-exam/sessions/:id` | SUPER_ADMIN, ADMIN | Delete session |
| POST | `/online-exam/submit` | STUDENT | Submit answers — auto-graded, score saved immediately |
| GET | `/online-exam/submissions` | SUPER_ADMIN, ADMIN, TEACHER | List submissions (filter: sessionId, studentId) |

---

### Homework — `/api/v1/homework`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/homework` | SUPER_ADMIN, ADMIN, TEACHER | Create homework |
| GET | `/homework` | All | List homework (filter: classId, sectionId, subjectId) |
| PATCH | `/homework/:id` | SUPER_ADMIN, ADMIN, TEACHER | Update homework |
| DELETE | `/homework/:id` | SUPER_ADMIN, ADMIN, TEACHER | Delete homework |
| POST | `/homework/submit` | STUDENT | Submit homework |
| GET | `/homework/:id/submissions` | SUPER_ADMIN, ADMIN, TEACHER | List submissions for a homework |
| PATCH | `/homework/submissions/:id/evaluate` | SUPER_ADMIN, ADMIN, TEACHER | Evaluate submission (marks + feedback) |

---

### Timetable — `/api/v1/timetable`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/timetable` | SUPER_ADMIN, ADMIN | Create class timetable entry |
| GET | `/timetable` | All | List timetable (filter: classId, sectionId, dayOfWeek) |
| PATCH | `/timetable/:id` | SUPER_ADMIN, ADMIN | Update timetable entry |
| DELETE | `/timetable/:id` | SUPER_ADMIN, ADMIN | Delete timetable entry |
| POST | `/timetable/exam` | SUPER_ADMIN, ADMIN | Create exam timetable entry |
| GET | `/timetable/exam` | All | List exam timetable (filter: examId, classId) |
| DELETE | `/timetable/exam/:id` | SUPER_ADMIN, ADMIN | Delete exam timetable entry |

**Day of week values:** 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday

---

### Library — `/api/v1/books`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/books` | SUPER_ADMIN, ADMIN, LIBRARIAN | Add book |
| GET | `/books` | All | List books (filter: branchId, categoryId) |
| PATCH | `/books/:id` | SUPER_ADMIN, ADMIN, LIBRARIAN | Update book |
| DELETE | `/books/:id` | SUPER_ADMIN, ADMIN, LIBRARIAN | Delete book |
| POST | `/books/issue` | SUPER_ADMIN, ADMIN, LIBRARIAN | Issue book to student |
| GET | `/books/issue` | SUPER_ADMIN, ADMIN, LIBRARIAN | List issued books (filter: studentId, status) |
| PATCH | `/books/issue/:id/return` | SUPER_ADMIN, ADMIN, LIBRARIAN | Mark book as returned |
| GET | `/books/overdue` | SUPER_ADMIN, ADMIN, LIBRARIAN | List overdue books |

---

### Notice — `/api/v1/notice`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/notice` | SUPER_ADMIN, ADMIN | Create notice |
| GET | `/notice` | All | List notices (filter: branchId) |
| GET | `/notice/:id` | All | Get notice details |
| PATCH | `/notice/:id` | SUPER_ADMIN, ADMIN | Update notice |
| DELETE | `/notice/:id` | SUPER_ADMIN, ADMIN | Delete notice |

---

### Events — `/api/v1/events`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/events` | SUPER_ADMIN, ADMIN | Create event |
| GET | `/events` | All | List events (filter: branchId, month) |
| GET | `/events/:id` | All | Get event details |
| PATCH | `/events/:id` | SUPER_ADMIN, ADMIN | Update event |
| DELETE | `/events/:id` | SUPER_ADMIN, ADMIN | Delete event |

---

### Hostel — `/api/v1/hostel`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/hostel` | SUPER_ADMIN, ADMIN | Create hostel |
| GET | `/hostel` | All | List hostels (filter: branchId) |
| PATCH | `/hostel/:id` | SUPER_ADMIN, ADMIN | Update hostel |
| DELETE | `/hostel/:id` | SUPER_ADMIN, ADMIN | Delete hostel |
| POST | `/hostel/rooms` | SUPER_ADMIN, ADMIN | Add room to hostel |
| GET | `/hostel/rooms` | All | List rooms (filter: hostelId) |
| POST | `/hostel/categories` | SUPER_ADMIN, ADMIN | Create hostel category |
| GET | `/hostel/categories` | All | List categories (filter: branchId) |
| DELETE | `/hostel/categories/:id` | SUPER_ADMIN, ADMIN | Delete category |
| POST | `/hostel/allocations` | SUPER_ADMIN, ADMIN | Allocate student to room |
| GET | `/hostel/allocations` | SUPER_ADMIN, ADMIN | List allocations (filter: hostelId, studentId) |
| DELETE | `/hostel/allocations/:id` | SUPER_ADMIN, ADMIN | Remove allocation |

---

### Transport — `/api/v1/transport`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/transport/routes` | SUPER_ADMIN, ADMIN | Create route |
| GET | `/transport/routes` | All | List routes (filter: branchId) |
| PATCH | `/transport/routes/:id` | SUPER_ADMIN, ADMIN | Update route |
| DELETE | `/transport/routes/:id` | SUPER_ADMIN, ADMIN | Delete route |
| POST | `/transport/vehicles` | SUPER_ADMIN, ADMIN | Add vehicle |
| GET | `/transport/vehicles` | All | List vehicles (filter: branchId) |
| PATCH | `/transport/vehicles/:id` | SUPER_ADMIN, ADMIN | Update vehicle |
| DELETE | `/transport/vehicles/:id` | SUPER_ADMIN, ADMIN | Delete vehicle |
| POST | `/transport/stoppages` | SUPER_ADMIN, ADMIN | Add stoppage to route |
| GET | `/transport/stoppages` | All | List stoppages (filter: routeId, branchId) |
| PATCH | `/transport/stoppages/:id` | SUPER_ADMIN, ADMIN | Update stoppage |
| DELETE | `/transport/stoppages/:id` | SUPER_ADMIN, ADMIN | Delete stoppage |
| POST | `/transport/assign` | SUPER_ADMIN, ADMIN | Assign student to transport route |
| GET | `/transport/assignments` | All | List assignments (filter: studentId, routeId, sessionId) |
| DELETE | `/transport/assignments/:id` | SUPER_ADMIN, ADMIN | Remove assignment |

---

### Accounting — `/api/v1/accounting`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/accounting/accounts` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Create account |
| GET | `/accounting/accounts` | SUPER_ADMIN, ADMIN, ACCOUNTANT | List accounts (filter: branchId) |
| PATCH | `/accounting/accounts/:id` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Update account |
| DELETE | `/accounting/accounts/:id` | SUPER_ADMIN, ADMIN | Delete account |
| POST | `/accounting/voucher-heads` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Create voucher head |
| GET | `/accounting/voucher-heads` | SUPER_ADMIN, ADMIN, ACCOUNTANT | List voucher heads |
| DELETE | `/accounting/voucher-heads/:id` | SUPER_ADMIN, ADMIN | Delete voucher head |
| POST | `/accounting/transactions` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Record debit/credit transaction (updates account balance) |
| GET | `/accounting/transactions` | SUPER_ADMIN, ADMIN, ACCOUNTANT | List transactions (filter: accountId, type, dateRange) |
| DELETE | `/accounting/transactions/:id` | SUPER_ADMIN, ADMIN | Delete transaction |
| GET | `/accounting/balance-sheet` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Balance sheet (assets vs liabilities) |
| GET | `/accounting/income-expense-report` | SUPER_ADMIN, ADMIN, ACCOUNTANT | P&L report (filter: month, year, branchId) |

---

### Payroll — `/api/v1/payroll`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/payroll/templates` | SUPER_ADMIN, ADMIN | Create salary template |
| GET | `/payroll/templates` | All | List templates (filter: branchId) |
| PATCH | `/payroll/templates/:id` | SUPER_ADMIN, ADMIN | Update template |
| DELETE | `/payroll/templates/:id` | SUPER_ADMIN, ADMIN | Delete template |
| POST | `/payroll/templates/:id/details` | SUPER_ADMIN, ADMIN | Add allowance/deduction detail to template |
| GET | `/payroll/templates/:id/details` | All | List template allowances/deductions |
| DELETE | `/payroll/templates/details/:id` | SUPER_ADMIN, ADMIN | Remove template detail |
| POST | `/payroll/generate` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Generate payroll for staff member (month/year) |
| GET | `/payroll/list` | SUPER_ADMIN, ADMIN, ACCOUNTANT | List payroll records (filter: staffId, month, year) |
| PATCH | `/payroll/:id/pay` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Mark payroll as paid |

---

### Advance Salary — `/api/v1/advance-salary`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/advance-salary` | All authenticated | Apply for advance salary |
| GET | `/advance-salary` | SUPER_ADMIN, ADMIN, ACCOUNTANT | List applications (filter: staffId, status) |
| PATCH | `/advance-salary/:id/approve` | SUPER_ADMIN, ADMIN | Approve application |
| PATCH | `/advance-salary/:id/reject` | SUPER_ADMIN, ADMIN | Reject application |
| PATCH | `/advance-salary/:id/pay` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Mark as paid |

---

### Leave — `/api/v1/leave`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/leave/categories` | SUPER_ADMIN, ADMIN | Create leave category |
| GET | `/leave/categories` | All | List leave categories |
| DELETE | `/leave/categories/:id` | SUPER_ADMIN, ADMIN | Delete category |
| POST | `/leave/apply` | All authenticated | Apply for leave |
| GET | `/leave/applications` | SUPER_ADMIN, ADMIN | List all applications (filter: staffId, status) |
| GET | `/leave/my` | All authenticated | Get own leave applications |
| PATCH | `/leave/:id/approve` | SUPER_ADMIN, ADMIN | Approve leave application |
| PATCH | `/leave/:id/reject` | SUPER_ADMIN, ADMIN | Reject leave application |

---

### Inventory — `/api/v1/inventory`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/inventory/categories` | SUPER_ADMIN, ADMIN | Create inventory category |
| GET | `/inventory/categories` | All | List categories (filter: branchId) |
| DELETE | `/inventory/categories/:id` | SUPER_ADMIN, ADMIN | Delete category |
| POST | `/inventory/products` | SUPER_ADMIN, ADMIN | Add product |
| GET | `/inventory/products` | All | List products (filter: categoryId, branchId) |
| PATCH | `/inventory/products/:id` | SUPER_ADMIN, ADMIN | Update product |
| DELETE | `/inventory/products/:id` | SUPER_ADMIN, ADMIN | Delete product |
| POST | `/inventory/products/:id/add-stock` | SUPER_ADMIN, ADMIN | Add stock (purchase) — increments currentStock |
| POST | `/inventory/issues` | SUPER_ADMIN, ADMIN | Issue stock to department/person — decrements stock |
| GET | `/inventory/issues` | SUPER_ADMIN, ADMIN | List issue records (filter: productId, branchId) |

---

### Reception — `/api/v1/reception`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/reception/visitors` | SUPER_ADMIN, ADMIN, RECEPTIONIST | Log visitor entry |
| GET | `/reception/visitors` | SUPER_ADMIN, ADMIN, RECEPTIONIST | List visitors (filter: date, branchId) |
| PATCH | `/reception/visitors/:id/checkout` | SUPER_ADMIN, ADMIN, RECEPTIONIST | Record visitor checkout time |
| DELETE | `/reception/visitors/:id` | SUPER_ADMIN, ADMIN | Delete visitor record |
| POST | `/reception/postal` | SUPER_ADMIN, ADMIN, RECEPTIONIST | Log postal record (receive or dispatch) |
| GET | `/reception/postal` | SUPER_ADMIN, ADMIN, RECEPTIONIST | List postal records (filter: type, branchId) |
| DELETE | `/reception/postal/:id` | SUPER_ADMIN, ADMIN | Delete postal record |
| POST | `/reception/complaints` | All authenticated | File a complaint |
| GET | `/reception/complaints` | SUPER_ADMIN, ADMIN, RECEPTIONIST | List complaints (filter: status, branchId) |
| PATCH | `/reception/complaints/:id/close` | SUPER_ADMIN, ADMIN | Close complaint |

---

### Certificates & ID Cards — `/api/v1/certificates`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/certificates` | SUPER_ADMIN, ADMIN | Create certificate/ID card/admit card template |
| GET | `/certificates` | All | List templates (filter: type, branchId) |
| GET | `/certificates/:id` | All | Get template details |
| PATCH | `/certificates/:id` | SUPER_ADMIN, ADMIN | Update template |
| DELETE | `/certificates/:id` | SUPER_ADMIN, ADMIN | Delete template |

**Template types:** `certificate`, `id_card`, `admit_card`

---

### Awards — `/api/v1/awards`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/awards` | SUPER_ADMIN, ADMIN | Create award record |
| GET | `/awards` | All | List awards (filter: recipientType, branchId) |
| PATCH | `/awards/:id` | SUPER_ADMIN, ADMIN | Update award |
| DELETE | `/awards/:id` | SUPER_ADMIN, ADMIN | Delete award |

**Recipient types:** `student`, `staff`

---

### Alumni — `/api/v1/alumni`

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/alumni` | SUPER_ADMIN, ADMIN | Add alumni record |
| GET | `/alumni` | All | List alumni (filter: passingYear, branchId) |
| GET | `/alumni/:id` | All | Get alumni details |
| PATCH | `/alumni/:id` | SUPER_ADMIN, ADMIN | Update alumni |
| DELETE | `/alumni/:id` | SUPER_ADMIN, ADMIN | Delete alumni |

---

### Dashboard — `/api/v1/dashboard`

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/dashboard/stats` | SUPER_ADMIN, ADMIN | Summary counts: students, staff, parents, fees collected/pending, events, books |
| GET | `/dashboard/attendance` | SUPER_ADMIN, ADMIN, TEACHER | Today's attendance breakdown by status (present/absent/late) |
| GET | `/dashboard/recent-payments` | SUPER_ADMIN, ADMIN, ACCOUNTANT | Last 10 fee payments |

---

## Swagger UI

The full API is documented and testable via Swagger UI.

1. Start the server: `npm run start:dev`
2. Navigate to: `http://localhost:3000/api/docs`
3. Click **Authorize** (top right) and enter your Bearer token from the login response
4. Authorization persists across page refreshes (`persistAuthorization: true`)

All endpoints display:
- Request body schemas with example values
- Query parameter descriptions and types
- Response codes
- Required roles in the summary

---

## Database Notes

### Auto-Migration (Development)

`synchronize: true` is enabled in the TypeORM config for development. All tables are created/altered automatically from entity definitions when the server starts. No manual migration runs are needed during development.

> For production: set `synchronize: false` and generate TypeORM migrations with `npm run typeorm migration:generate`.

### Naming Conventions

- **Table names:** `snake_case` plural (e.g., `transport_stoppages`, `salary_template_details`)
- **Column names:** `snake_case` (e.g., `branch_id`, `created_at`)
- **TypeScript entity properties:** `camelCase` — TypeORM maps between the two automatically

### Delete Behavior

All delete operations are hard deletes — rows are physically removed. There are no soft-delete columns unless explicitly noted in the entity.

### Atomic Admission Transaction

The `POST /admission` endpoint uses `DataSource.transaction()` to guarantee all inserts succeed together or fully roll back. The following tables are written in a single transaction:

1. `parents` — guardian/parent record
2. `login_credentials` (role=PARENT) — parent portal login
3. `students` — student profile with all personal fields
4. `login_credentials` (role=STUDENT) — student portal login
5. `enrolls` — class/section/roll placement for the session
6. `transport_assigns` — transport route assignment (optional)
7. `hostel_allocations` — hostel room assignment (optional)

---

## Key Design Decisions

**`nestjs-api-forge` response envelope** — all controller methods return plain data; the library wraps it in `{ success, statusCode, message, data }` automatically via `@ForgeMessage()`.

**`ParseIntIdPipe`** on all `:id` route params — rejects non-numeric or negative IDs with HTTP 400 before reaching the service layer.

**`bcrypt` (not `bcryptjs`)** — the project uses the native `bcrypt` npm package. Import as `import * as bcrypt from 'bcrypt'`.

**`@CurrentUser()`** decorator — extracts `id`, `role`, `staffId` from the decoded JWT payload. Services receive identity from the token, not from the request body.

**Role enforcement** — `RolesGuard` + `@Roles()` metadata. Endpoints without `@Roles()` are accessible to any authenticated user (valid JWT required).

**Branch isolation** — most list queries accept an optional `branchId` filter. SUPER_ADMIN can query across branches; ADMIN typically passes their own branchId.
