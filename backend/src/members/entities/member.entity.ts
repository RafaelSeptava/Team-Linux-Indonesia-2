export type MemberGender = 'Pria' | 'Wanita';
export type DistroBasis = 'Debian' | 'Arch' | 'Fedora' | 'Lainnya';
export type MemberExperience =
	| 'Kurang dari 1 tahun'
	| '1 - 3 tahun'
	| 'Lebih dari 3 tahun';

export class Member {
	id!: number;
	nama!: string;
	gender!: MemberGender;
	basis!: DistroBasis;
	distro!: string;
	pengalaman!: MemberExperience;
	keterampilan!: string;
	createdAt!: Date;
}
