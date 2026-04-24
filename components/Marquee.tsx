const collaborators = [
  "Cassina",
  "Kettal",
  "Molteni&C",
  "Flos",
  "Living Divani",
  "Paola Lenti",
  "B&B Italia",
  "Poliform",
  "Dedar",
  "Pierre Frey",
  "Rubelli",
  "Loro Piana",
  "Hermès Maison",
  "Fornasetti",
  "Liaigre",
  "Frette",
];

export default function Marquee() {
  return (
    <div className="py-10 border-t border-b border-[var(--color-line)] overflow-hidden">
      <div className="flex gap-0 animate-marquee whitespace-nowrap">
        {[...collaborators, ...collaborators, ...collaborators, ...collaborators].map((name, i) => (
          <span
            key={i}
            className="inline-flex items-center text-[0.75rem] tracking-[0.25em] uppercase px-10"
            style={{ color: "var(--color-muted)", fontFamily: "var(--font-hanken, sans-serif)" }}
          >
            {name}
            <span
              className="mx-10 inline-block w-1 h-1 rounded-full bg-[var(--color-accent)]"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
