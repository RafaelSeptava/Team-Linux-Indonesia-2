import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MembersService } from './members.service.js';

describe('MembersService', () => {
  let membersService: MembersService;

  beforeEach(() => {
    membersService = new MembersService();
  });

  it('creates, reads, updates, and removes members', () => {
    const member = membersService.create({
      nama: 'Rafael Putra Septava',
      gender: 'Pria',
      basis: 'Arch',
      distro: 'Arch Linux',
      pengalaman: 'Kurang dari 1 tahun',
      keterampilan: 'Ricing, SoftDev',
    });

    expect(member.id).toBe(1);
    expect(member.createdAt).toBeInstanceOf(Date);
    expect(membersService.findAll()).toEqual([member]);
    expect(membersService.findOne(member.id)).toEqual(member);
    expect(() => membersService.update(member.id, {})).toThrow(
      BadRequestException,
    );

    const updatedMember = membersService.update(member.id, {
      distro: 'Fedora',
    });
    expect(updatedMember.distro).toBe('Fedora');

    expect(membersService.remove(member.id)).toEqual(updatedMember);
    expect(membersService.findAll()).toEqual([]);
    expect(() => membersService.findOne(member.id)).toThrow(NotFoundException);
  });
});