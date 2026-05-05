import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from 'nestjs-api-forge';
import { Event } from './entities/event.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class CommunicationService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async createEvent(dto: Partial<Event>): Promise<Event> {
    return this.eventRepo.save(this.eventRepo.create(dto));
  }

  async getEvents(branchId?: number, sessionId?: number): Promise<Event[]> {
    const where: any = {};
    if (branchId) where.branchId = branchId;
    if (sessionId) where.sessionId = sessionId;
    return this.eventRepo.find({ where, order: { fromDate: 'DESC' } });
  }

  async findEvent(id: number): Promise<Event> {
    const event = await this.eventRepo.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async updateEvent(id: number, dto: Partial<Event>): Promise<Event> {
    const event = await this.findEvent(id);
    Object.assign(event, dto);
    return this.eventRepo.save(event);
  }

  async removeEvent(id: number): Promise<void> {
    const event = await this.findEvent(id);
    await this.eventRepo.remove(event);
  }

  async sendMessage(dto: Partial<Message>): Promise<Message> {
    return this.messageRepo.save(this.messageRepo.create(dto));
  }

  async getInbox(receiverId: number): Promise<Message[]> {
    return this.messageRepo.find({
      where: { receiverId },
      order: { createdAt: 'DESC' },
    });
  }

  async getSent(senderId: number): Promise<Message[]> {
    return this.messageRepo.find({
      where: { senderId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: number): Promise<void> {
    const msg = await this.messageRepo.findOne({ where: { id } });
    if (!msg) throw new NotFoundException('Message not found');
    await this.messageRepo.update(id, { isRead: true });
  }
}
