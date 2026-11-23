interface DistroCardProps {
  name: string;
  logo: string;
  description: string;
  category: string;
}

export default function DistroCard({
  name,
  logo,
  description,
  category,
}: DistroCardProps) {
  return (
    <div className="distro-card">
      <span className="badge-category">{category}</span>
      <h4>{name}</h4>
      <img src={logo} alt={`${name} Logo`} />
      <p>{description}</p>
    </div>
  );
}
