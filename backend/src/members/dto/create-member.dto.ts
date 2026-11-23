import { IsIn, IsString, MinLength } from 'class-validator';
import type {
	DistroBasis,
	MemberExperience,
	MemberGender,
} from '../entities/member.entity.js';

export class CreateMemberDto {
	@IsString()
	@MinLength(2)
	nama!: string;

	@IsIn(['Pria', 'Wanita'])
	gender!: MemberGender;

	@IsIn(['Debian', 'Arch', 'Fedora', 'Lainnya'])
	basis!: DistroBasis;

	@IsString()
	@MinLength(2)
	distro!: string;

	@IsIn([
		'Kurang dari 1 tahun',
		'1 - 3 tahun',
		'Lebih dari 3 tahun',
	])
	pengalaman!: MemberExperience;

	@IsString()
	keterampilan!: string;
}
