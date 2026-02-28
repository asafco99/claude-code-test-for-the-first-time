"use client";

import { Loader2 } from "lucide-react";

interface StrReplaceArgs {
  command?: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  path?: string;
}

interface FileManagerArgs {
  command?: "rename" | "delete";
  path?: string;
  new_path?: string;
}

interface ToolInvocation {
  toolName: string;
  state: string;
  result?: unknown;
  args?: Record<string, unknown>;
}

interface ToolCallBadgeProps {
  tool: ToolInvocation;
}

function getLabel(toolName: string, args?: Record<string, unknown>): string {
  if (toolName === "str_replace_editor") {
    const { command, path } = (args ?? {}) as StrReplaceArgs;
    const file = path ?? "file";
    switch (command) {
      case "create":
        return `Creating ${file}`;
      case "str_replace":
      case "insert":
        return `Editing ${file}`;
      case "view":
        return `Viewing ${file}`;
      case "undo_edit":
        return `Undoing edit in ${file}`;
      default:
        return path ? `Working on ${file}` : "Working...";
    }
  }

  if (toolName === "file_manager") {
    const { command, path, new_path } = (args ?? {}) as FileManagerArgs;
    const file = path ?? "file";
    switch (command) {
      case "rename":
        return new_path ? `Renaming ${file} to ${new_path}` : `Renaming ${file}`;
      case "delete":
        return `Deleting ${file}`;
      default:
        return path ? `Working on ${file}` : "Working...";
    }
  }

  return toolName;
}

export function ToolCallBadge({ tool }: ToolCallBadgeProps) {
  const isDone = tool.state === "result" && tool.result != null;
  const label = getLabel(tool.toolName, tool.args);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
