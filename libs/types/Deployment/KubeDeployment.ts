import KubeResourceBase from "../KubeResourceBase.ts";
import KubeDeploymentSpec from "./KubeDeploymentSpec.ts";

export default interface KubeDeployment extends KubeResourceBase {
  apiVersion: "apps/v1";
  kind: "Deployment";
  spec: KubeDeploymentSpec;
}
