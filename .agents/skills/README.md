# Project skills

These skills are checked into `.agents/skills` so a fresh checkout includes their
instructions, referenced recipes, scripts, datasets, and upstream licenses.
No personal skill installation or Claude plugin environment is required.
Project product decisions and the approved implementation plan take precedence
over generic recommendations in these upstream skills.

## Installed design and motion set

| Source | Local skill directories | Pinned commit |
| --- | --- | --- |
| GreenSock/gsap-skills | gsap-core, gsap-timeline, gsap-react, gsap-scrolltrigger, gsap-performance | aed9cfd3277740755f6bfc1155c7aa645403b760 |
| emilkowalski/skills | emil-design-eng, animate, find-animation-opportunities, review-animations | d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7 |
| Leonxlnx/taste-skill | design-taste-frontend | ccbc15639c97057cbfcf32ecebc38ef716e4bb37 |
| nextlevelbuilder/ui-ux-pro-max-skill | ui-ux-pro-max | f3ac195224eac1eb0dfe1a3059c2a6add78ffbe3 |
| anthropics/skills | frontend-design | 41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f |

Each directory has `ORIGIN.json` with source URL, pinned commit, upstream path,
original `SKILL.md` SHA-256, license location, and local adaptations.
`skills-lock.json` registers the source, upstream skill path, pinned `ref`, and
installed folder `computedHash`; all previous lock entries remain intact.

The only instruction adaptation is in UI/UX Pro Max: search commands use the
repository-local path instead of `CLAUDE_PLUGIN_ROOT`. Its scripts, datasets,
and reference files remain unchanged. Taste's upstream folder is `taste-skill`,
installed here under its declared name `design-taste-frontend`.

## Run UI/UX searches

From the repository root (Python 3, no external Python dependencies):

```bash
PYTHONDONTWRITEBYTECODE=1 python3 .agents/skills/ui-ux-pro-max/scripts/search.py "focus not obscured" --domain ux -n 2
PYTHONDONTWRITEBYTECODE=1 python3 .agents/skills/ui-ux-pro-max/scripts/search.py "scroll reveal reduced motion" --domain gsap -n 2
```

Use the smallest relevant search domain and apply the approved Ai Labs direction
to results. Do not persist a replacement design system unless requested.

## Reproducible updates

Review an upstream change before replacing a pinned skill. Use the official
skill-installer helper with the source/path/ref in `ORIGIN.json` and
`--dest <repository>/.agents/skills`; it intentionally refuses existing folders.
Stage updates separately, preserve upstream resources/licenses, reapply documented
local adaptations, then update the provenance and lock entry together.

`computedHash` follows the skills CLI v1 local lock implementation: recursively
collect regular files (excluding `.git` and `node_modules`), sort relative paths
with JavaScript `localeCompare`, and SHA-256 each UTF-8 relative path followed by
its file bytes. License and origin files are included; no timestamp is added.
