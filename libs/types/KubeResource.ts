import KubeResourceBase from "./KubeResourceBase.ts";

export interface KubeResourceList {
  apiVersion: string;
  kind: "ConfigMapList";
  items: KubeResource[];
}

export default interface KubeResource extends KubeResourceBase {
  apiVersion: string;
  kind: "Pod" | "Deployment" | "ConfigMap";

  // Mainly used for ConfigMap
  data?: { [key: string]: string };
  binaryData?: { [key: string]: Uint8Array };
  immutable?: boolean;
}
