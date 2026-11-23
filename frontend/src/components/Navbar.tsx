import type { Dispatch, SetStateAction } from "react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <aside className="sidebar">
      <nav>
        <button
          className={activeTab === "beranda" ? "active" : ""}
          onClick={() => setActiveTab("beranda")}
        >
          Beranda
        </button>
        <button
          className={activeTab === "distro" ? "active" : ""}
          onClick={() => setActiveTab("distro")}
        >
          Distro
        </button>
        <button
          className={activeTab === "join" ? "active" : ""}
          onClick={() => setActiveTab("join")}
        >
          Join & Member
        </button>
      </nav>
    </aside>
  );
}
