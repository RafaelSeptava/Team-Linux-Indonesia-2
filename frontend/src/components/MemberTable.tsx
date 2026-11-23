import type { Member } from "../api/members";

interface MemberTableProps {
  members: Member[];
  isLoading: boolean;
  deletingMemberId: number | null;
  onEditMember: (member: Member) => void;
  onDeleteMember: (id: number) => Promise<void>;
}

export default function MemberTable({
  members,
  isLoading,
  deletingMemberId,
  onEditMember,
  onDeleteMember,
}: MemberTableProps) {
  if (isLoading) {
    return (
      <div className="empty-state" role="status">
        Memuat daftar member...
      </div>
    );
  }

  // Conditional Rendering jika daftar member kosong
  if (members.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada data member TeamLinux Indonesia.</p>
      </div>
    );
  }

  return (
    <section className="table-container">
      <h2>Daftar Member Komunitas</h2>
      <table className="member-table">
        <thead>
          <tr>
            <th>Nama User</th>
            <th>Gender</th>
            <th>Basis Distro</th>
            <th>Distro Favorit</th>
            <th>Pengalaman</th>
            <th>Keterampilan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Render List menggunakan map() */}
          {members.map((member) => (
            <tr key={member.id}>
              <td className="name">{member.nama}</td>
              <td>{member.gender}</td>
              <td>
                <span className="badge badge-blue">{member.basis}</span>
              </td>
              <td>{member.distro}</td>
              <td>{member.pengalaman}</td>
              <td>
                <span className="badge badge-green">{member.keterampilan}</span>
              </td>
              <td>
                <div className="member-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => onEditMember(member)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    disabled={deletingMemberId === member.id}
                    onClick={() => void onDeleteMember(member.id)}
                  >
                    {deletingMemberId === member.id ? "Menghapus..." : "Hapus"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
