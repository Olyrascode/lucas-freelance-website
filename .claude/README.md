# Claude multi-agent setup

## Structure

- `CLAUDE.md` — engineering rules, reusable across projects
- `context/project.md` — current project identity (brief, tone, fonts, refs)
- `context/design-system.md` — tokens and scales (mirrors `src/styles/_variables.scss`)
- `agents/architect.md` — UX/UI architect role (writes specs)
- `agents/coder.md` — implementation coder role (implements specs)
- `agents/reviewer.md` — code reviewer role (audits implementations)
- `specs/` — approved specs, Git-tracked

## Workflow

1. Open 3 Claude Code sessions, name them Architect / Coder / Reviewer.
2. First message in each:
   - Architect: "Read `.claude/agents/architect.md` and adopt this role"
   - Coder: "Read `.claude/agents/coder.md` and adopt this role"
   - Reviewer: "Read `.claude/agents/reviewer.md` and adopt this role"
3. For each feature:
   1. Brief the Architect → spec saved in `.claude/specs/[name].md`
   2. Review & approve the spec yourself
   3. Brief the Coder with the approved spec path → implementation
   4. Brief the Reviewer with the spec path → verdict
   5. If changes are requested, loop back to the Coder

## Cloning to a new project

1. Copy the `.claude/` folder into the new repo
2. Rewrite `context/project.md` (client, brief, fonts, positioning)
3. Fill in `context/design-system.md` placeholders
4. Pre-generate `src/styles/_variables.scss` and `src/styles/_mixins.scss` from `design-system.md`
5. Clear `specs/`
6. Done
