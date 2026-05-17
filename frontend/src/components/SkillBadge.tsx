import type { Skill } from "../types/api";

export function SkillBadge({ skill, highlighted = false }: { skill: Skill; highlighted?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-mist transition ${highlighted ? "border-accent/45 bg-accent/10" : "border-line bg-panel"}`}>
      <span className={`h-2 w-2 rounded-full ${highlighted ? "bg-gold" : "bg-accent"}`} />
      {skill.name}
    </span>
  );
}
