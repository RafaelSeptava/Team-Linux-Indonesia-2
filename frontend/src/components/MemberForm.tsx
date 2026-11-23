import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Member, MemberInput } from "../api/members";

type Skill = "Scripting" | "Server" | "Ricing" | "SoftDev";
const availableSkills: Skill[] = ["Scripting", "Server", "Ricing", "SoftDev"];

interface MemberFormProps {
  member: Member | null;
  onSubmitMember: (member: MemberInput) => Promise<boolean>;
  onCancelEdit: () => void;
}

export default function MemberForm({
  member,
  onSubmitMember,
  onCancelEdit,
}: MemberFormProps) {
  const [nama, setNama] = useState(member?.nama ?? "");
  const [gender, setGender] = useState<MemberInput["gender"]>(
    member?.gender ?? "Pria",
  );
  const [basis, setBasis] = useState<MemberInput["basis"]>(
    member?.basis ?? "Arch",
  );
  const [distro, setDistro] = useState(member?.distro ?? "");
  const [pengalaman, setPengalaman] =
    useState<MemberInput["pengalaman"]>(
      member?.pengalaman ?? "Kurang dari 1 tahun",
    );
  const [skills, setSkills] = useState<Skill[]>(
    member && member.keterampilan !== "Belum ada"
      ? (member.keterampilan.split(", ") as Skill[])
      : [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const skill = value as Skill;
    if (checked) {
      setSkills((currentSkills) => [...currentSkills, skill]);
    } else {
      setSkills((currentSkills) =>
        currentSkills.filter((currentSkill) => currentSkill !== skill),
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const saved = await onSubmitMember({
        nama: nama.trim(),
        gender,
        basis,
        distro: distro.trim(),
        pengalaman,
        keterampilan: skills.length > 0 ? skills.join(", ") : "Belum ada",
      });

      if (saved) {
        setNama("");
        setDistro("");
        setSkills([]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="form-card">
      <h2>{member ? "Edit Data Anggota" : "Pendaftaran Anggota Baru"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama User:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value as MemberInput["gender"])
            }
          >
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
          </select>
        </div>

        <div className="form-group">
          <label>Basis Distro Favorit:</label>
          <select
            value={basis}
            onChange={(e) => setBasis(e.target.value as MemberInput["basis"])}
          >
            <option value="Debian">Debian</option>
            <option value="Arch">Arch</option>
            <option value="Fedora">Fedora</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="form-group">
          <label>Distro Favorit Spesifik:</label>
          <input
            type="text"
            value={distro}
            onChange={(e) => setDistro(e.target.value)}
            placeholder="Contoh: Arch Linux, Ubuntu, Fedora..."
            required
          />
        </div>

        <div className="form-group">
          <label>Pengalaman Penggunaan:</label>
          <select
            value={pengalaman}
            onChange={(e) =>
              setPengalaman(e.target.value as MemberInput["pengalaman"])
            }
          >
            <option value="Kurang dari 1 tahun">Kurang dari 1 tahun</option>
            <option value="1 - 3 tahun">1 - 3 tahun</option>
            <option value="Lebih dari 3 tahun">Lebih dari 3 tahun</option>
          </select>
        </div>

        <div className="skills-group">
          <label>Keterampilan:</label>
          <div className="skills-checkboxes">
              {availableSkills.map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={skills.includes(skill)}
                  onChange={handleCheckboxChange}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting
            ? "Menyimpan..."
            : member
              ? "Simpan Perubahan"
              : "Tambah Anggota"}
        </button>
        {member && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancelEdit}
            disabled={isSubmitting}
          >
            Batal
          </button>
        )}
      </form>
    </section>
  );
}
