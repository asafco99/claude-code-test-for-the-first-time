import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallBadge } from "../ToolCallBadge";

afterEach(() => {
  cleanup();
});

function makeTool(
  toolName: string,
  args: Record<string, unknown>,
  state: string,
  result?: unknown
) {
  return { toolName, args, state, result };
}

test("str_replace_editor create shows spinner while in call state", () => {
  render(
    <ToolCallBadge
      tool={makeTool("str_replace_editor", { command: "create", path: "/App.jsx" }, "call")}
    />
  );
  expect(screen.getByText("Creating /App.jsx")).toBeDefined();
  expect(document.querySelector(".animate-spin")).toBeDefined();
});

test("str_replace_editor create shows green dot in result state", () => {
  render(
    <ToolCallBadge
      tool={makeTool("str_replace_editor", { command: "create", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Creating /App.jsx")).toBeDefined();
  expect(document.querySelector(".bg-emerald-500")).toBeDefined();
  expect(document.querySelector(".animate-spin")).toBeNull();
});

test("str_replace_editor str_replace → Editing", () => {
  render(
    <ToolCallBadge
      tool={makeTool("str_replace_editor", { command: "str_replace", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Editing /App.jsx")).toBeDefined();
});

test("str_replace_editor insert → Editing", () => {
  render(
    <ToolCallBadge
      tool={makeTool("str_replace_editor", { command: "insert", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Editing /App.jsx")).toBeDefined();
});

test("str_replace_editor view → Viewing", () => {
  render(
    <ToolCallBadge
      tool={makeTool("str_replace_editor", { command: "view", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Viewing /App.jsx")).toBeDefined();
});

test("str_replace_editor undo_edit → Undoing edit", () => {
  render(
    <ToolCallBadge
      tool={makeTool("str_replace_editor", { command: "undo_edit", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Undoing edit in /App.jsx")).toBeDefined();
});

test("str_replace_editor with no args → Working...", () => {
  render(
    <ToolCallBadge
      tool={makeTool("str_replace_editor", {}, "call")}
    />
  );
  expect(screen.getByText("Working...")).toBeDefined();
});

test("file_manager rename with new_path → Renaming X to Y", () => {
  render(
    <ToolCallBadge
      tool={makeTool("file_manager", { command: "rename", path: "/old.jsx", new_path: "/new.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Renaming /old.jsx to /new.jsx")).toBeDefined();
});

test("file_manager delete → Deleting", () => {
  render(
    <ToolCallBadge
      tool={makeTool("file_manager", { command: "delete", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Deleting /App.jsx")).toBeDefined();
});

test("unknown tool name falls back to raw tool name", () => {
  render(
    <ToolCallBadge
      tool={makeTool("some_unknown_tool", {}, "call")}
    />
  );
  expect(screen.getByText("some_unknown_tool")).toBeDefined();
});
