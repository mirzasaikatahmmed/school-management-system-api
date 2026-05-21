import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getStats(branchId?: number, sessionId?: number) {
    const params: (number | string)[] = [];
    let branchFilter = '';
    let sessionFilter = '';
    let p = 1;

    if (branchId) {
      branchFilter = `AND branch_id = $${p++}`;
      params.push(branchId);
    }
    if (sessionId) {
      sessionFilter = `AND session_id = $${p++}`;
      params.push(sessionId);
    }

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
        branchId ? [branchId] : [],
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM staff WHERE 1=1 ${branchFilter}`,
        branchId ? [branchId] : [],
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM parents WHERE 1=1 ${branchFilter}`,
        branchId ? [branchId] : [],
      ),
      this.dataSource.query(
        `SELECT COALESCE(SUM(paid_amount), 0) as total FROM fee_payment_histories WHERE 1=1 ${branchFilter} ${sessionFilter}`,
        params,
      ),
      this.dataSource.query(
        `SELECT COALESCE(SUM(due_amount), 0) as total FROM fee_payment_histories WHERE due_amount > 0 ${branchFilter} ${sessionFilter}`,
        params,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM events WHERE 1=1 ${branchFilter} ${sessionFilter}`,
        params,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count FROM book WHERE 1=1 ${branchFilter}`,
        branchId ? [branchId] : [],
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
    const params: (number | string)[] = [today];
    let branchFilter = '';
    let sessionFilter = '';
    let p = 2;

    if (branchId) {
      branchFilter = `AND branch_id = $${p++}`;
      params.push(branchId);
    }
    if (sessionId) {
      sessionFilter = `AND session_id = $${p++}`;
      params.push(sessionId);
    }

    const baseQuery = `FROM student_attendances WHERE attendance_date = $1 ${branchFilter} ${sessionFilter}`;

    const [present, absent, holiday, late] = await Promise.all([
      this.dataSource.query(
        `SELECT COUNT(*) as count ${baseQuery} AND status = 'P'`,
        params,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count ${baseQuery} AND status = 'A'`,
        params,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count ${baseQuery} AND status = 'H'`,
        params,
      ),
      this.dataSource.query(
        `SELECT COUNT(*) as count ${baseQuery} AND status = 'L'`,
        params,
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
    const safeLimit = Math.min(Math.max(parseInt(String(limit)) || 10, 1), 100);
    const params: (number | string)[] = [];
    let branchFilter = '';

    if (branchId) {
      branchFilter = `AND branch_id = $1`;
      params.push(branchId);
    }

    const rows = await this.dataSource.query(
      `SELECT * FROM fee_payment_histories WHERE 1=1 ${branchFilter} ORDER BY created_at DESC LIMIT ${safeLimit}`,
      params,
    );
    return rows;
  }
}
