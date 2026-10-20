// DSH-owned location adapter for the upstream default path.
import os from "node:os";
import path from "node:path";
export function managedShortcutsPath(){return path.join(process.env.DSH_HOME||path.join(os.homedir(),".dsh"),"aiyoucodex-dsh","shortcuts.json");}
