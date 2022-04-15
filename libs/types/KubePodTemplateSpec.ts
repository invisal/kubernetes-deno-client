import KubeObjectMeta from "./KubeObjectMeta.ts";
import KubePodSpec from "./KubePodSpec.ts";

// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#podtemplatespec-v1-core
export default interface KubePodTemplateSpec {
  metadata: KubeObjectMeta;
  spec: KubePodSpec;
}
