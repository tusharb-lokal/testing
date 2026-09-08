---
name: explain-code
description: Explain a piece of code, a function, a script, or a repo's logic by walking through it in plain language AND rendering an accompanying diagram (flowchart, sequence diagram, or architecture diagram) of its control flow or component interactions. Use this whenever the user pastes code and asks what it does, asks to "explain this code", "walk me through this function", "how does this work", "trace the logic", "show me the flow", "diagram this", or otherwise wants to understand a piece of code's behavior — even if they don't explicitly ask for a diagram. A diagram should accompany almost every non-trivial code explanation, not just ones where it's explicitly requested.
---

# Explain Code (with Diagram)

Explaining code as a wall of prose is a missed opportunity — most code has a shape (branches, loops, calls between functions/services) that a small diagram conveys far faster than paragraphs. This skill produces BOTH a plain-language walkthrough AND a visual.

## When to use this

Trigger on requests like:
- "explain this code" / "what does this function do"
- "walk me through this script"
- "how does this class/module work"
- "trace what happens when X is called"
- "show me the flow of this code"
- "diagram this function/repo"

Skip the diagram (text explanation only) if:
- The snippet is trivial (a single straight-line calculation, a getter, a one-line regex) — a diagram would add nothing.
- The user explicitly says they just want a quick text summary.

## Workflow

### 1. Read and understand the code first

If the code isn't already in the conversation, read the file(s) with `view`/`bash_tool`. For a multi-file task, identify the entry point and the 2-5 files that matter most — don't try to diagram an entire large repo at once; scope to the function/module/flow the user actually asked about.

Identify:
- **Entry point(s)**: where execution starts (a function call, an HTTP route, a CLI command, an event handler)
- **Shape of the logic**: linear steps, branching (if/else, switch), loops, recursion, async/await, error handling paths
- **Actors involved**: is it a single function, or does it call out to other functions, services, a database, an API, a queue?

This determines which diagram type fits (see step 3).

### 2. Write the plain-language walkthrough

Before or alongside the diagram, give a short prose explanation:
- 1-2 sentences: what this code is *for* (the purpose, not a line-by-line restatement)
- Then walk through the logic in the order it executes, calling out branches and edge cases in plain English
- Keep it concrete: name actual variables/functions from the code, don't abstract them away
- Avoid restating every line — focus on the decisions and the "why," since the diagram will carry the structural detail

### 3. Choose the right diagram type

| Code shape | Diagram type |
|---|---|
| Sequential steps with some branching (if/else, early returns, loops) | **Flowchart** |
| Multiple functions/services/objects calling each other over time | **Sequence diagram** |
| Multiple components/modules/services and how they're wired together (imports, dependencies, data flow) | **Architecture / component diagram** |
| Data transforming through stages (pipeline, ETL, build steps) | **Pipeline / stage diagram** (flowchart variant, left-to-right) |
| State transitions (an object/order/connection moving between states) | **State diagram** |

When in doubt, default to a flowchart — it's the most broadly legible option for "what happens when this runs."

### 4. Render the diagram

Use the Visualizer:
1. Call `visualize:read_me` with `modules: ["diagram"]` (silently — don't narrate this step to the user).
2. Call `visualize:show_widget` with an SVG diagram following that module's guidance (CSS variables for theming, correct viewBox, etc). Use `platform: "mobile"` if the system prompt indicates a mobile/narrow client.
3. Diagram content rules:
   - Label nodes with the *actual* function/variable names from the code, not generic placeholders like "Step 1"
   - Show branch conditions on the edges out of a decision node (e.g. `user.isAdmin? → yes / no`)
   - Keep error/exception paths visible if the code has meaningful error handling — don't diagram only the happy path
   - For sequence diagrams, order actors left-to-right in the order they're first involved, and label each arrow with the call/method name
   - Don't cram more than ~12-15 nodes into one diagram; if the code is bigger than that, diagram the top-level flow and offer to zoom into a sub-part on request

### 5. Interleave, don't stack

Follow the pattern: brief intro → diagram → detailed walkthrough referencing the diagram's nodes by name (e.g. "Once `validateInput` passes, control moves to `processOrder`, which is where the retry loop you see in the diagram kicks in"). Don't dump the whole explanation before the diagram or the whole diagram before any explanation — they should reinforce each other.

## Notes

- If the code spans multiple files/functions and doing full justice would require several diagrams, do the most useful one first (usually the top-level flow) and ask if they want a deeper diagram of a specific part, rather than generating several diagrams unprompted.
- If the "code" is actually pseudocode, a config file, or a data pipeline described in prose, the same approach applies — diagram the flow described.
- This skill produces an inline visual (via the Visualizer), not a downloadable file. If the user wants a diagram they can keep/edit/export separately, mention that briefly, and only create a standalone diagram file if they confirm.