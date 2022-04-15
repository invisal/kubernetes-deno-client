import KubeObjectMeta from "./KubeObjectMeta.ts";

export default interface KubePersistanceVolumeClaim {
  apiVersion: "v1";
  kind: "PersistentVolumeClaim";
  metadata: KubeObjectMeta;
}
