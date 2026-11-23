import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';
import { Member } from './entities/member.entity.js';

@Injectable()
export class MembersService {
  private members: Member[] = [];
  private nextId = 1;

  create(createMemberDto: CreateMemberDto): Member {
    const member = Object.assign(new Member(), createMemberDto, {
      id: this.nextId++,
      createdAt: new Date(),
    });

    this.members.push(member);
    return member;
  }

  findAll(): Member[] {
    return [...this.members];
  }

  findOne(id: number): Member {
    const member = this.members.find((item) => item.id === id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    return member;
  }

  update(id: number, updateMemberDto: UpdateMemberDto): Member {
    const existingMember = this.findOne(id);
    if (Object.keys(updateMemberDto).length === 0) {
      throw new BadRequestException('At least one member field must be provided');
    }

    const updatedMember = Object.assign(
      new Member(),
      existingMember,
      updateMemberDto,
    );
    this.members = this.members.map((member) =>
      member.id === id ? updatedMember : member,
    );

    return updatedMember;
  }

  remove(id: number): Member {
    const member = this.findOne(id);
    this.members = this.members.filter((item) => item.id !== id);

    return member;
  }
}
