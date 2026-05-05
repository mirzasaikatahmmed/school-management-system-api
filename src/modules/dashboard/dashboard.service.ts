import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getStats(branchId?: number, sessionId?: number) {
    const branchFilter = branchId ? `AND branch_id = ${branchId}` : '';
    const sessionFilter = sessionId ? `AND session_id = ${sessionId}` : '';

    const [
      students,
      staff,
      parents,
      feesCollected,
      pendingFees,
      events,
      books,
    ] = await Promise.all([
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM students WHERE 1=1 ${branchFilter}`,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM staff WHERE 1=1 ${branchFilter}`,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM parents WHERE 1=1 ${branchFilter}`,
      ),
      this.dataSource.query(
        `SELECT COALESCE(SUM(paid_amount), 0) as total FROM fee_payment_histories WHERE 1=1 ${branchFilter} ${sessionFilter}`,
      ),
      this.dataSource.query(
        `SELECT COALESCE(SUM(due_amount), 0) as total FROM fee_payment_histories WHERE due_amount > 0 ${branchFilter} ${sessionFilter}`,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM events WHERE 1=1 ${branchFilter} ${sessionFilter}`,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM books WHERE 1=1 ${branchFilter}`,
      ),
    ]);

    return {
      totalStudents: parseInt(students[0]?.count || '0'),
      totalStaff: parseInt(staff[0]?.count || '0'),
      totalParents: parseInt(parents[0]?.count || '0'),
      feesCollected: parseFloat(feesCollected[0]?.total || '0'),
      pendingFees: parseFloat(pendingFees[0]?.total || '0'),
      totalEvents: parseInt(events[0]?.count || '0'),
      totalBooks: parseInt(books[0]?.count || '0'),
    };
  }

  async getAttendanceSummary(branchId?: number, sessionId?: number) {
    const today = new Date().toISOString().split('T')[0];
    const branchFilter = branchId ? `AND branch_id = ${branchId}` : '';
    const sessionFilter = sessionId ? `AND session_id = ${sessionId}` : '';

    const [present, absent, holiday, late] = await Promise.all([
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM student_attendances WHERE attendance_date = '${today}' AND status = 'P' ${branchFilter} ${sessionFilter}`,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM student_attendances WHERE attendance_date = '${today}' AND status = 'A' ${branchFilter} ${sessionFilter}`,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM student_attendances WHERE attendance_date = '${today}' AND status = 'H' ${branchFilter} ${sessionFilter}`,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM student_attendances WHERE attendance_date = '${today}' AND status = 'L' ${branchFilter} ${sessionFilter}`,
      ),
    ]);

    const total =
      parseInt(present[0]?.count) +
      parseInt(absent[0]?.count) +
      parseInt(holiday[0]?.count) +
      parseInt(late[0]?.count);
    const presentCount = parseInt(present[0]?.count || '0');

    return {
      date: today,
      present: presentCount,
      absent: parseInt(absent[0]?.count || '0'),
      holiday: parseInt(holiday[0]?.count || '0'),
      late: parseInt(late[0]?.count || '0'),
      total,
      attendancePercentage:
        total > 0 ? ((presentCount / total) * 100).toFixed(2) : '0.00',
    };
  }

  async getRecentPayments(branchId?: number, limit = 10) {
    const branchFilter = branchId ? `AND branch_id = ${branchId}` : '';
    const rows = await this.dataSource.query(
      `SELECT * FROM fee_payment_histories WHERE 1=1 ${branchFilter} ORDER BY created_at DESC LIMIT ${limit}`,
    );
    return rows;
  }
}
