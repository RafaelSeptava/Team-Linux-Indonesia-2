export type MemberGender = 'Pria' | 'Wanita';
export type DistroBasis = 'Debian' | 'Arch' | 'Fedora' | 'Lainnya';
export type MemberExperience =
  | 'Kurang dari 1 tahun'
  | '1 - 3 tahun'
  | 'Lebih dari 3 tahun';

export interface MemberInput {
  nama: string;
  gender: MemberGender;
  basis: DistroBasis;
  distro: string;
  pengalaman: MemberExperience;
  keterampilan: string;
}

export interface Member extends MemberInput {
  id: number;
  createdAt: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/members${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });
  const responseText = await response.text();
  const data: unknown = responseText ? JSON.parse(responseText) : undefined;

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    if (data && typeof data === 'object' && 'message' in data) {
      const details = data.message;
      message = Array.isArray(details)
        ? details.join(', ')
        : typeof details === 'string'
          ? details
          : message;
    }
    throw new Error(message);
  }

  return data as T;
}

export const membersApi = {
  findAll: () => request<Member[]>(''),
  create: (member: MemberInput) =>
    request<Member>('', { method: 'POST', body: JSON.stringify(member) }),
  update: (id: number, member: MemberInput) =>
    request<Member>(`/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(member),
    }),
  remove: (id: number) => request<Member>(`/${id}`, { method: 'DELETE' }),
};