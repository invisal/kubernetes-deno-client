import KubeDeploymentSpec from "./KubeDeploymentSpec.ts";
import KubeObjectMeta from "./KubeObjectMeta.ts";

export interface KubeResourceList {
  apiVersion: string;
  kind: "ConfigMapList";
  items: KubeResource[];
}

export default interface KubeResource {
  apiVersion: string;
  kind: "Pod" | "Deployment" | "ConfigMap";
  metadata?: KubeObjectMeta;

  // Mainly used for ConfigMap
  data?: { [key: string]: string };
  binaryData?: { [key: string]: Uint8Array };
  immutable?: boolean;

  spec: KubeDeploymentSpec;
}
