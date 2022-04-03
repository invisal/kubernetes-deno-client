import KubeObjectMeta from "./KubeObjectMeta.ts";

export default interface KubeResource {
  apiVersion: string;
  kind: "Pod" | "Deployment" | "ConfigMap";
  metadata?: KubeObjectMeta;

  // Mainly used for ConfigMap
  data?: { [key: string]: string };
  binaryData?: { [key: string]: Uint8Array };
  immutable?: boolean;
}
